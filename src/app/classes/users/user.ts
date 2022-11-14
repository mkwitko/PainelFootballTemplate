import { MasterHelperService } from './../../helpers/masterHelper/master-helper.service';
import { environment } from 'src/environments/environment';
import { AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Injectable } from '@angular/core';
import { User } from 'src/app/interfaces/auth/user';

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

  constructor(private helper: MasterHelperService) {
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

  addUser(who: any, id: string, withDate = true) {
    if (withDate) {
      who.userCreatedAt = Date.now();
    }
    this.helper.crudHelper.crud.addUser(this.collection, who, id);
  }
}
