import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BannersCrudPageRoutingModule } from './banners-crud-routing.module';

import { BannersCrudPage } from './banners-crud.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BannersCrudPageRoutingModule
  ],
  declarations: [BannersCrudPage]
})
export class BannersCrudPageModule {}
