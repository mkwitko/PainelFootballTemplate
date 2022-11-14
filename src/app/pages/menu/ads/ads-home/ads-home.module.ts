import { MyCustomHeader } from './../../../../components/header/header/header.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdsHomePageRoutingModule } from './ads-home-routing.module';

import { AdsHomePage } from './ads-home.page';
import { MyCustomFooter } from 'src/app/components/footer/footer/footer.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdsHomePageRoutingModule,
    MyCustomHeader,
    MyCustomFooter,
  ],
  declarations: [AdsHomePage],
})
export class AdsHomePageModule {}
