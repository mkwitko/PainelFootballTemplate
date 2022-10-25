import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BannersHomePageRoutingModule } from './banners-home-routing.module';

import { BannersHomePage } from './banners-home.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BannersHomePageRoutingModule
  ],
  declarations: [BannersHomePage]
})
export class BannersHomePageModule {}
