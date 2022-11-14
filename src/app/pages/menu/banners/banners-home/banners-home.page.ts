import { NavigationService } from 'src/app/services/navigation/navigation.service';
import { Banners } from 'src/app/classes/banners/banners';
import { Component, OnInit } from '@angular/core';
import { MasterHelperService } from 'src/app/helpers/masterHelper/master-helper.service';
import { MasterService } from 'src/app/services/master/master.service';
import { ScreenService } from 'src/app/services/screen/screen.service';

@Component({
  selector: 'app-banners-home',
  templateUrl: './banners-home.page.html',
  styleUrls: ['./banners-home.page.scss'],
})
export class BannersHomePage implements OnInit {
  constructor(
    public myClass: Banners,
    private navigation: NavigationService,
    private helper: MasterHelperService,
    private master: MasterService,
    private screen: ScreenService
  ) {}

  ngOnInit() {}

  goTo(id) {
    this.navigation.rotaId('banners-crud', id);
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
