import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StoreCrudPage } from './store-crud.page';

const routes: Routes = [
  {
    path: '',
    component: StoreCrudPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StoreCrudPageRoutingModule {}
