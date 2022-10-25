import { ScreenService } from './../screen/screen.service';
import { UserClass } from './../../classes/users/user';
import { Injectable } from '@angular/core';

import {
  ActionPerformed,
  PushNotificationSchema,
  PushNotifications,
  Token,
} from '@capacitor/push-notifications';
import { MasterHelperService } from 'src/app/helpers/masterHelper/master-helper.service';

@Injectable({
  providedIn: 'root',
})
export class PushService {
  constructor(
    private masterHelper: MasterHelperService,
    private user: UserClass,
    private screen: ScreenService
  ) {}

  addListeners = async () => {
    await PushNotifications.addListener('registration', (token) => {
      if (this.user.get()) {
        const updateUser = this.user.get();
        updateUser.token = token.value;
        this.masterHelper.crudHelper.update(
          this.user.collection,
          updateUser,
          updateUser.userId
        );
        // this.user.update(updateUser);
      }
    });

    await PushNotifications.addListener('registrationError', (err) => {
      console.error('Registration error: ', err.error);
    });

    await PushNotifications.addListener(
      'pushNotificationReceived',
      (notification) => {
        console.log('Push notification received: ', notification);
        this.screen.presentToast(
          notification.body,
          notification.title,
          'sucess'
        );
      }
    );

    await PushNotifications.addListener(
      'pushNotificationActionPerformed',
      (notification) => {
        console.log(
          'Push notification action performed',
          notification.actionId,
          notification.inputValue
        );
      }
    );
  };

  init = async () => {
    if (true) {
      let permStatus = await PushNotifications.checkPermissions();

      if (permStatus.receive === 'prompt') {
        permStatus = await PushNotifications.requestPermissions();
      }

      if (permStatus.receive !== 'granted') {
        throw new Error('User denied permissions!');
      }
      console.log('register');
      await PushNotifications.register();

      this.addListeners();
    }
  };

  getDeliveredNotifications = async () => {
    const notificationList =
      await PushNotifications.getDeliveredNotifications();
    console.log('delivered notifications', notificationList);
  };
}
