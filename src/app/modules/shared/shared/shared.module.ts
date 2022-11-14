import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserClass } from 'src/app/classes/users/user';
import { MasterHelperService } from 'src/app/helpers/masterHelper/master-helper.service';
import { Banners } from 'src/app/classes/banners/banners';
import { UpdateManagerClass } from 'src/app/classes/updateManager/update-manager';
import { News } from 'src/app/classes/news/news';
import { Ads } from 'src/app/classes/ads/ads';
import { StoreClass } from 'src/app/classes/store/store';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [
    UserClass,
    Banners,
    News,
    Ads,
    UpdateManagerClass,
    MasterHelperService,
    StoreClass,
  ],
})
export class SharedModule {}
