import { Banners } from './../../classes/banners/banners';
import { MasterHelperService } from 'src/app/helpers/masterHelper/master-helper.service';
import { AuthService } from 'src/app/services/firebase/auth.service';
import { UpdateBoolean } from './../../interfaces/update/update-bool';
import { Injectable } from '@angular/core';
import { PushService } from '../push/push.service';
import { UpdateInterface } from 'src/app/interfaces/update/update-interface';
import { UserClass } from 'src/app/classes/users/user';
import { UpdateManagerClass } from 'src/app/classes/updateManager/update-manager';
import { News } from 'src/app/classes/news/news';
import { Ads } from 'src/app/classes/ads/ads';
import { StoreClass } from 'src/app/classes/store/store';
import { WhiteLabelService } from '../white-label/white-label.service';

@Injectable({
  providedIn: 'root',
})
export class MasterService {
  constructor(
    private master: MasterHelperService,
    private userClass: UserClass,
    private bannerClass: Banners,
    private newsClass: News,
    private adsClass: Ads,
    private updateManager: UpdateManagerClass,
    private storeClass: StoreClass,
    private whiteLabel: WhiteLabelService
  ) {}

  setUser(id: string) {
    this.master
      .setClassById(
        id,
        true,
        this.userClass.cachePathMyUser,
        this.userClass.collection,
        this.userClass.ref
      )
      .then((res) => {
        if (res) {
          this.userClass.set(res);
          // this.auth.auth.currentUser.getIdTokenResult().then((token) => {
          //   console.log(token);
          // });
          // this.push.init();
        }
      });
  }

  makeUpdate(shouldUpdate) {
    let data: UpdateInterface = {};
    for (const a in shouldUpdate) {
      const obj = shouldUpdate[a];
      if (a !== 'id') {
        data[a] = obj;
      }
    }
    return data;
  }

  checkUpdate(shouldUpdate: UpdateInterface): Promise<any> {
    return new Promise((resolve) => {
      const data = this.makeUpdate(shouldUpdate);
      let shouldUpdateFinal: any = [];
      const oldData = this.updateManager.getOld();
      if (oldData && Object.keys(data).length > 0) {
        Object.entries(data).forEach((e) => {
          data[e[0]] !== oldData[e[0]]
            ? (shouldUpdateFinal[e[0]] = true)
            : (shouldUpdateFinal[e[0]] = false);
        });
        resolve(shouldUpdateFinal);
      } else {
        resolve(false);
      }
    });
  }

  set(api = true) {
    this.setter();

    this.updateManager.setClass().then((shouldUpdate) => {
      if (shouldUpdate) {
        this.checkUpdate(shouldUpdate).then((res: UpdateBoolean) => {
          this.setter(shouldUpdate, res);
        });
      }
    });
  }

  private setter(shouldUpdate = false, res?) {
    this.master
      .setClassAll(
        shouldUpdate !== false ? res.banner : false,
        this.bannerClass.path,
        this.bannerClass.collection
      )
      .then((banners) => {
        this.bannerClass.set(banners);
      });
    if (!this.whiteLabel.app.isWordpress) {
      this.master
        .setClassAll(
          shouldUpdate !== false ? res.news : false,
          this.newsClass.path,
          this.newsClass.collection
        )
        .then((news) => {
          this.newsClass.set(news);
        });
    }
    this.master
      .setClassAll(
        shouldUpdate !== false ? res.ads : false,
        this.adsClass.path,
        this.adsClass.collection
      )
      .then((ads) => {
        this.adsClass.set(ads);
      });
    this.master
      .setClassAll(
        shouldUpdate !== false ? res.redirectCard : false,
        this.storeClass.path,
        this.storeClass.collection
      )
      .then((store) => {
        this.storeClass.set(store);
      });
  }
}
