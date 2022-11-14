import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BannersHomePageRoutingModule } from './banners-home-routing.module';

import { BannersHomePage } from './banners-home.page';
import { MyCustomFooter } from 'src/app/components/footer/footer/footer.module';
import { MyCustomHeader } from 'src/app/components/header/header/header.module';
import { MySkeletonBanner } from 'src/app/components/skeleton/skeleton-banner/skeleton-banner.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BannersHomePageRoutingModule,
    MyCustomHeader,
    MyCustomFooter,
    MySkeletonBanner,
  ],
  declarations: [BannersHomePage],
})
export class BannersHomePageModule {}
