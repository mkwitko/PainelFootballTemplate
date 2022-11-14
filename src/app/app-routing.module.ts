import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/auth/login/login.module').then((m) => m.LoginPageModule),
    canActivate: [LoginGuard],
  },
  {
    path: 'forgot',
    loadChildren: () =>
      import('./pages/auth/forgot/forgot.module').then(
        (m) => m.ForgotPageModule
      ),
    canActivate: [LoginGuard],
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./pages/menu/home/home.module').then((m) => m.HomePageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'banners-home',
    loadChildren: () =>
      import('./pages/menu/banners/banners-home/banners-home.module').then(
        (m) => m.BannersHomePageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'banners-crud',
    loadChildren: () =>
      import('./pages/menu/banners/banners-crud/banners-crud.module').then(
        (m) => m.BannersCrudPageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'ads-home',
    loadChildren: () =>
      import('./pages/menu/ads/ads-home/ads-home.module').then(
        (m) => m.AdsHomePageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'ads-crud',
    loadChildren: () =>
      import('./pages/menu/ads/ads-crud/ads-crud.module').then(
        (m) => m.AdsCrudPageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'news-home',
    loadChildren: () =>
      import('./pages/menu/news/news-home/news-home.module').then(
        (m) => m.NewsHomePageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'news-crud',
    loadChildren: () =>
      import('./pages/menu/news/news-crud/news-crud.module').then(
        (m) => m.NewsCrudPageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'notifications-home',
    loadChildren: () =>
      import(
        './pages/menu/notifications/notifications-home/notifications-home.module'
      ).then((m) => m.NotificationsHomePageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'store-home',
    loadChildren: () =>
      import('./pages/menu/store/store-home/store-home.module').then(
        (m) => m.StoreHomePageModule
      ),
  },
  {
    path: 'store-crud',
    loadChildren: () =>
      import('./pages/menu/store/store-crud/store-crud.module').then(
        (m) => m.StoreCrudPageModule
      ),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
