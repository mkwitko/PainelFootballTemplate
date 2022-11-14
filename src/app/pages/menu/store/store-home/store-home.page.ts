import { StoreClass } from './../../../../classes/store/store';
import { Component, OnInit } from '@angular/core';
import { MasterHelperService } from 'src/app/helpers/masterHelper/master-helper.service';
import { MasterService } from 'src/app/services/master/master.service';
import { NavigationService } from 'src/app/services/navigation/navigation.service';
import { ScreenService } from 'src/app/services/screen/screen.service';

@Component({
  selector: 'app-store-home',
  templateUrl: './store-home.page.html',
  styleUrls: ['./store-home.page.scss'],
})
export class StoreHomePage {
  constructor(
    public myClass: StoreClass,
    private navigation: NavigationService,
    private helper: MasterHelperService,
    private master: MasterService,
    private screen: ScreenService
  ) {}

  ngOnInit() {}

  goTo(id) {
    this.navigation.rotaId('store-crud', id);
  }

  del(who) {
    this.helper
      .delete(
        this.myClass.collection,
        who.id,
        who.downUrl ? true : false,
        this.myClass.upper(),
        who.downUrl
      )
      .then(() => {
        this.master.set();
        this.screen.presentToast('Deletado com sucesso!', '1', 'Sucesso!');
      });
  }
}
