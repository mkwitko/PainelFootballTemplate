import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewsHomePageRoutingModule } from './news-home-routing.module';

import { NewsHomePage } from './news-home.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewsHomePageRoutingModule
  ],
  declarations: [NewsHomePage]
})
export class NewsHomePageModule {}
