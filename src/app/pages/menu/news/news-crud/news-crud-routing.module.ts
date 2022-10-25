import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewsCrudPage } from './news-crud.page';

const routes: Routes = [
  {
    path: '',
    component: NewsCrudPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewsCrudPageRoutingModule {}
