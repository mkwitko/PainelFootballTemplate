import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: 'banners-home',
    loadChildren: () =>
      import('./pages/menu/banners/banners-home/banners-home.module').then(
        (m) => m.BannersHomePageModule
      ),
  },
  {
    path: 'banners-crud',
    loadChildren: () =>
      import('./pages/menu/banners/banners-crud/banners-crud.module').then(
        (m) => m.BannersCrudPageModule
      ),
  },
  {
    path: 'ads-home',
    loadChildren: () =>
      import('./pages/menu/ads/ads-home/ads-home.module').then(
        (m) => m.AdsHomePageModule
      ),
  },
  {
    path: 'ads-crud',
    loadChildren: () =>
      import('./pages/menu/ads/ads-crud/ads-crud.module').then(
        (m) => m.AdsCrudPageModule
      ),
  },
  {
    path: 'news-home',
    loadChildren: () =>
      import('./pages/menu/news/news-home/news-home.module').then(
        (m) => m.NewsHomePageModule
      ),
  },
  {
    path: 'news-crud',
    loadChildren: () =>
      import('./pages/menu/news/news-crud/news-crud.module').then(
        (m) => m.NewsCrudPageModule
      ),
  },
  {
    path: 'notifications-home',
    loadChildren: () =>
      import(
        './pages/menu/notifications/notifications-home/notifications-home.module'
      ).then((m) => m.NotificationsHomePageModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
