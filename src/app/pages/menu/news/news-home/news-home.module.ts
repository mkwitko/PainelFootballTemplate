import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewsHomePageRoutingModule } from './news-home-routing.module';

import { NewsHomePage } from './news-home.page';
import { MyCustomFooter } from 'src/app/components/footer/footer/footer.module';
import { MyCustomHeader } from 'src/app/components/header/header/header.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewsHomePageRoutingModule,
    MyCustomHeader,
    MyCustomFooter,
  ],
  declarations: [NewsHomePage],
})
export class NewsHomePageModule {}
