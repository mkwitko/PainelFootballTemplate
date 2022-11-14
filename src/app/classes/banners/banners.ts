import { Injectable } from '@angular/core';
import { AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { MasterHelperService } from 'src/app/helpers/masterHelper/master-helper.service';
import { Banner } from 'src/app/interfaces/banner/banner';
import { UpdateInterface } from 'src/app/interfaces/update/update-interface';
import { environment } from 'src/environments/environment';

@Injectable()
export class Banners {
  public collection: AngularFirestoreCollection;
  public path = environment.global.paths.banner;

  private value = new Array<Banner>();
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
    this.setFinder(value);
  }

  find(id) {
    return this.finder[id];
  }

  upper() {
    let result: UpdateInterface = {
      banner: new Date().getTime(),
    };
    return result;
  }

  private setFinder(value) {
    for (const a of value) {
      this.finder[a.id] = a;
    }
  }
}
