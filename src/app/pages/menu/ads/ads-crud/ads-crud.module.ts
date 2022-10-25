import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdsCrudPageRoutingModule } from './ads-crud-routing.module';

import { AdsCrudPage } from './ads-crud.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdsCrudPageRoutingModule
  ],
  declarations: [AdsCrudPage]
})
export class AdsCrudPageModule {}
