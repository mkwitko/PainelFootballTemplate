import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdsHomePage } from './ads-home.page';

const routes: Routes = [
  {
    path: '',
    component: AdsHomePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdsHomePageRoutingModule {}
