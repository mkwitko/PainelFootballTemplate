import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BannersCrudPageRoutingModule } from './banners-crud-routing.module';

import { BannersCrudPage } from './banners-crud.page';
import { MyCustomHeader } from 'src/app/components/header/header/header.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BannersCrudPageRoutingModule,
    MyCustomHeader,
  ],
  declarations: [BannersCrudPage],
})
export class BannersCrudPageModule {}
