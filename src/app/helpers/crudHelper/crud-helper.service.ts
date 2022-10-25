import { Injectable } from '@angular/core';
import { CrudService } from 'src/app/services/crud/crud.service';
import { ScreenService } from 'src/app/services/screen/screen.service';
import { TranslateService } from 'src/app/services/translate/translate.service';

@Injectable({
  providedIn: 'root',
})
export class CrudHelperService {
  constructor(
    public crud: CrudService,
    private screen: ScreenService,
    private translate: TranslateService
  ) {}

  /* Create */
  addUser(collection, who: any, id: string, withDate = true) {
    if (withDate) {
      who.userCreatedAt = Date.now();
    }
    this.crud.addUser(collection, who, id);
  }

  /* Read */
  getHttp(collection, id: string, ref): Promise<any> {
    return new Promise((resolve) => {
      this.crud.get(collection, ref, id).subscribe({
        next: (res) => {
          const result = res;
          resolve(result);
        },
        error: (err) => {
          this.screen.presentToast(this.translate.verifyErrors(err.code));
        },
      });
    });
  }
  getAllHttp(collection) {
    return new Promise((resolve) => {
      this.crud.getAll(collection).subscribe({
        next: (res) => {
          const result = res;
          resolve(result);
        },
        error: (err) => {
          this.screen.presentToast(this.translate.verifyErrors(err.code));
        },
      });
    });
  }

  /* Update */
  update(collection, who: any, id): Promise<any> {
    return new Promise((resolve, reject) => {
      this.crud
        .update(collection, who, id)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  /* Delete */
}
