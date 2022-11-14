import { TranslateService } from './../../../services/translate/translate.service';
import { MenuService } from './../../../services/menu/menu.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/auth/user';
import { AuthService } from 'src/app/services/firebase/auth.service';
import { ScreenService } from 'src/app/services/screen/screen.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  public userLogin: User = {};
  constructor(
    private menu: MenuService,
    private screen: ScreenService,
    private auth: AuthService,
    private translate: TranslateService
  ) {}

  ngOnInit() {
    this.menu.menuControl(false);
  }

  async login() {
    this.auth.login(this.userLogin);
  }
}
