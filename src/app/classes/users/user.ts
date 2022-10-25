import { MasterHelperService } from './../../helpers/masterHelper/master-helper.service';
import { CacheService } from './../../services/cache/cache.service';
import { environment } from 'src/environments/environment';
import { AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { CrudService } from './../../services/crud/crud.service';
import { Injectable } from '@angular/core';
import { ScreenService } from 'src/app/services/screen/screen.service';
import { TranslateService } from 'src/app/services/translate/translate.service';
import { User } from 'src/app/interfaces/auth/user';
import { WhiteLabelService } from 'src/app/services/white-label/white-label.service';

@Injectable()
export class UserClass {
  public user: User = {};
  public userEdit: User = {};
  public interfaceRef: User;
  public anon = false;

  public collection: AngularFirestoreCollection;

  public cachePathMyUser = environment.global.paths.users.myUser;
  public cachePathAllUsers = environment.global.paths.users.allUsers;
  public ref = environment.global.paths.users.allUsers;

  constructor(
    private helper: MasterHelperService,
    private whiteLabel: WhiteLabelService
  ) {
    this.collection = this.helper.crudHelper.crud.collectionConstructor(
      this.ref
    );
  }

  get() {
    return this.user;
  }

  set(value, withEdit = true) {
    this.user = value;
    if (withEdit) this.setEdit(value);
  }

  getEdit() {
    return this.userEdit;
  }

  setEdit(value) {
    this.userEdit = value;
  }

  setAnon(bool) {
    if (bool) {
      this.user = {
        userEmail: environment.global.app.anon.email,
        userName: environment.global.app.anon.name,
      };
    }
    this.anon = true;
  }

  setSocioInfo(socioInfo) {
    this.whiteLabel.setSocioInfo(socioInfo);
  }

  addUser(who: any, id: string, withDate = true) {
    if (withDate) {
      who.userCreatedAt = Date.now();
    }
    this.helper.crudHelper.crud.addUser(this.collection, who, id);
  }
}
