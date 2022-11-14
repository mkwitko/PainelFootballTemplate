import { AngularFireRemoteConfig } from '@angular/fire/compat/remote-config';
import { MenuService } from './services/menu/menu.service';
import { WhiteLabelService } from 'src/app/services/white-label/white-label.service';
import { environment } from 'src/environments/environment';
import { NavigationService } from 'src/app/services/navigation/navigation.service';
import { Component } from '@angular/core';
import { AuthService } from './services/firebase/auth.service';
import { UserClass } from './classes/users/user';
import { MasterService } from './services/master/master.service';
import { RemoteConfigService } from './services/remoteConfig/remote-config.service';
import { UpdateManagerClass } from './classes/updateManager/update-manager';
import { WordpressService } from './services/apis/wordpress/wordpress.service';
import { ColorService } from './services/color/color.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public version = environment.global.version;

  constructor(
    public userClass: UserClass,
    public whiteLabel: WhiteLabelService,
    private nav: NavigationService,
    private auth: AuthService,
    private menu: MenuService,
    private master: MasterService,
    private remoteConfig: RemoteConfigService,
    private update: UpdateManagerClass,
    private wordpress: WordpressService,
    private themer: ColorService
  ) {
    this.remoteConfig.init().then(() => {
      this.themer.setTheme(this.whiteLabel.app.color);
      this.auth.getAuth().onAuthStateChanged((user) => {
        if (user) {
          this.update.getId().then((res) => {
            this.update.setId(res.id);
            this.master.setUser(user.uid);
            this.master.set();
            if (this.whiteLabel.app.isWordpress) {
              this.wordpress.getPosts();
            }
          });
        }
      });
    });
  }

  color() {}

  goTo(url) {
    this.nav.goTo(url);
    this.menu.closeMenu();
  }
  logout() {
    this.auth.logout();
    this.menu.closeMenu();
  }

  getDisabled(a) {
    if (a.disabled === true) {
      return a.disabled;
    } else {
      if (a.wordpress) {
        return this.whiteLabel.app.isWordpress;
      } else {
        return a.disabled;
      }
    }
  }
}
