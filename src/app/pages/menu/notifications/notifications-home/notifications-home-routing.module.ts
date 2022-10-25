import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotificationsHomePage } from './notifications-home.page';

const routes: Routes = [
  {
    path: '',
    component: NotificationsHomePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotificationsHomePageRoutingModule {}
