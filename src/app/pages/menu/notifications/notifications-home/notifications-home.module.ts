import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NotificationsHomePageRoutingModule } from './notifications-home-routing.module';

import { NotificationsHomePage } from './notifications-home.page';
import { MyCustomFooter } from 'src/app/components/footer/footer/footer.module';
import { MyCustomHeader } from 'src/app/components/header/header/header.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NotificationsHomePageRoutingModule,
    MyCustomHeader,
    MyCustomFooter,
  ],
  declarations: [NotificationsHomePage],
})
export class NotificationsHomePageModule {}
