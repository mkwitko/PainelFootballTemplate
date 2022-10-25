import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdsCrudPage } from './ads-crud.page';

const routes: Routes = [
  {
    path: '',
    component: AdsCrudPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdsCrudPageRoutingModule {}
