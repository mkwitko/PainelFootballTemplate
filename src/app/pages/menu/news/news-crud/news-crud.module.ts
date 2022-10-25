import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewsCrudPageRoutingModule } from './news-crud-routing.module';

import { NewsCrudPage } from './news-crud.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewsCrudPageRoutingModule
  ],
  declarations: [NewsCrudPage]
})
export class NewsCrudPageModule {}
