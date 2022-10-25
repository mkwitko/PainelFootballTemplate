import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BannersCrudPage } from './banners-crud.page';

const routes: Routes = [
  {
    path: '',
    component: BannersCrudPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BannersCrudPageRoutingModule {}
