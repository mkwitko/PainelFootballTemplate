import { redirectCard } from './../../interfaces/redirectCard/redirectCard';
import { Injectable } from '@angular/core';
import { AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { MasterHelperService } from 'src/app/helpers/masterHelper/master-helper.service';
import { UpdateInterface } from 'src/app/interfaces/update/update-interface';
import { environment } from 'src/environments/environment';

@Injectable()
export class StoreClass {
  public collection: AngularFirestoreCollection;
  public path = environment.global.paths.club;

  private value = new Array<redirectCard>();
  private finder = new Array<typeof this.value[0]>();

  constructor(private helper: MasterHelperService) {
    this.collection = this.helper.crudHelper.crud.collectionConstructor(
      this.path
    );
  }

  get() {
    return this.value;
  }

  set(value) {
    this.value = value;
    console.log(this.value);
    this.setFinder(value);
  }

  find(id) {
    return this.finder[id];
  }

  upper() {
    let result: UpdateInterface = {
      redirectCard: new Date().getTime(),
    };
    return result;
  }

  private setFinder(value) {
    for (const a of value) {
      this.finder[a.id] = a;
    }
  }
}
