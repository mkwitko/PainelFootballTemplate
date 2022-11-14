import { MyCustomFooter } from './../../../../components/footer/footer/footer.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StoreHomePageRoutingModule } from './store-home-routing.module';

import { StoreHomePage } from './store-home.page';
import { MyCustomHeader } from 'src/app/components/header/header/header.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StoreHomePageRoutingModule,
    MyCustomHeader,
    MyCustomFooter,
  ],
  declarations: [StoreHomePage],
})
export class StoreHomePageModule {}
