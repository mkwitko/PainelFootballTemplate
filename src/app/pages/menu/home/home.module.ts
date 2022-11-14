import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';
import { MyCustomHeader } from 'src/app/components/header/header/header.module';
import { MyCustomFooter } from 'src/app/components/footer/footer/footer.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    MyCustomHeader,
    MyCustomFooter,
  ],
  declarations: [HomePage],
})
export class HomePageModule {}
