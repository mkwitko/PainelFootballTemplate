import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NotificationsHomePageRoutingModule } from './notifications-home-routing.module';

import { NotificationsHomePage } from './notifications-home.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NotificationsHomePageRoutingModule
  ],
  declarations: [NotificationsHomePage]
})
export class NotificationsHomePageModule {}
