import { ScreenService } from './../screen/screen.service';
import { NavigationService } from 'src/app/services/navigation/navigation.service';
import { User } from 'src/app/interfaces/auth/user';
import { Injectable } from '@angular/core';
import {
  indexedDBLocalPersistence,
  initializeAuth,
  deleteUser,
  getAuth,
  signInAnonymously,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  Auth,
} from 'firebase/auth';
import { from } from 'rxjs';
import { TranslateService } from '../translate/translate.service';
import { UserClass } from 'src/app/classes/users/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  readonly auth: Auth;

  constructor(
    private navigation: NavigationService,
    private screen: ScreenService,
    private translante: TranslateService,
    private userClass: UserClass
  ) {
    this.auth = getAuth();
  }

  async login(user: User) {
    if (!user.userEmail || !user.password) {
      this.screen.presentToast('Preencha todos os campos.');
    } else {
      await this.screen.presentLoading();
      return from(
        signInWithEmailAndPassword(
          this.auth,
          user.userEmail.trim(),
          user.password.trim()
        )
          .catch((err) => {
            this.screen.presentToast(this.translante.verifyErrors(err.code));
          })
          .finally(() => {
            this.screen.dismissloading();
          })
      );
    }
  }

  async loginGuest() {
    await this.screen.presentLoading();
    return from(
      signInAnonymously(this.auth)
        .catch((err) => {
          this.screen.presentToast(this.translante.verifyErrors(err.code));
        })
        .finally(() => {
          this.screen.dismissloading();
        })
    );
  }

  async logout() {
    this.navigation.goTo('login');
    await this.screen.presentLoading();
    return from(
      this.auth
        .signOut()
        .catch((err) => {
          this.screen.presentToast(this.translante.verifyErrors(err.code));
        })
        .finally(() => {
          this.screen.dismissloading();
        })
    );
  }

  getAuth() {
    return this.auth;
  }

  async register(user: User, confirmPassword: string) {
    if (
      !user.userEmail ||
      !user.userName ||
      !user.password ||
      !confirmPassword
    ) {
      this.screen.presentToast('Preencha todos os campos.');
    } else {
      if (user.password !== confirmPassword) {
        this.screen.presentToast('Senhas não são iguais.');
      } else {
        await this.screen.presentLoading();
        return from(
          createUserWithEmailAndPassword(
            this.auth,
            user.userEmail.trim(),
            user.password.trim()
          )
            .then((res) => {
              console.log('add user - ', res);
              this.userClass.addUser(user, res.user.uid);
            })
            .catch((err) => {
              this.screen.presentToast(this.translante.verifyErrors(err.code));
              console.log(err);
            })
            .finally(() => {
              this.screen.dismissloading();
            })
        );
      }
    }
  }

  async resetPassword(email: string) {
    await this.screen.presentLoading();
    return from(
      sendPasswordResetEmail(this.auth, email.trim())
        .catch((err) => {
          this.screen.presentToast(this.translante.verifyErrors(err.code));
        })
        .finally(() => {
          this.screen.dismissloading();
        })
    );
  }

  async delete() {
    await this.screen.presentLoading();
    return from(
      this.auth.currentUser
        .delete()
        .catch((err) => {
          this.screen.presentToast(this.translante.verifyErrors(err.code));
        })
        .finally(() => {
          this.screen.dismissloading();
        })
    );
  }
}
