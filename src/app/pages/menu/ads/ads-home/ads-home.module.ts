import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdsHomePageRoutingModule } from './ads-home-routing.module';

import { AdsHomePage } from './ads-home.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdsHomePageRoutingModule
  ],
  declarations: [AdsHomePage]
})
export class AdsHomePageModule {}
