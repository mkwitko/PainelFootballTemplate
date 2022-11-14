import { UpdateManagerClass } from './../../classes/updateManager/update-manager';
import { Injectable } from '@angular/core';

import { CrudHelperService } from './../crudHelper/crud-helper.service';
import { CacheHelperService } from '../cacheHelper/cache-helper.service';
import { ScreenService } from 'src/app/services/screen/screen.service';

@Injectable({
  providedIn: 'root',
})
export class MasterHelperService {
  constructor(
    public crudHelper: CrudHelperService,
    public cacheHelper: CacheHelperService,
    private screen: ScreenService,
    private updateManager: UpdateManagerClass
  ) {}

  async save(collection, object, up, file, path): Promise<any> {
    await this.screen.presentLoading();
    return new Promise((resolve, reject) => {
      this.crudHelper
        .add(collection, object)
        .then((res) => {
          if (file && path) {
            this.crudHelper
              .upload(res.id, file, path)
              .then((uploaded) => {
                this.screen.dismissloading();
                object.id = res.id;
                object.downUrl = uploaded;
                this.update(collection, object, res.id, up)
                  .then((res) => {
                    resolve(res);
                  })
                  .catch((err) => {
                    this.screen.dismissloading();
                    reject(err);
                  });
              })
              .catch((err) => {
                this.screen.dismissloading();
                reject(err);
              });
          } else {
            this.screen.dismissloading();
            this.updateManager.willUpdate(up);
            resolve(res);
          }
        })
        .catch((err) => {
          this.screen.dismissloading();
          reject(err);
        });
    });
  }

  async update(collection, object, id, up, file?, path?): Promise<any> {
    await this.screen.presentLoading();
    return new Promise((resolve, reject) => {
      this.crudHelper
        .update(collection, object, id)
        .then((res) => {
          if (file && path) {
            this.crudHelper
              .upload(id, file, path)
              .then((res) => {
                this.updateManager.willUpdate(up);
                this.screen.dismissloading();
                resolve(res);
              })
              .catch((err) => {
                this.screen.dismissloading();
                reject(err);
              });
          } else {
            this.updateManager.willUpdate(up);
            this.screen.dismissloading();
            resolve(res);
          }
        })
        .catch((err) => {
          this.screen.dismissloading();
          reject(err);
        });
    });
  }

  async delete(collection, id, withImage, upper, ref?): Promise<any> {
    return new Promise((resolve, reject) => {
      this.crudHelper
        .delete(collection, id, withImage, ref)
        .then((res) => {
          this.updateManager.willUpdate(upper);
          resolve(res);
        })
        .catch((err) => {
          // this.screen.dismissloading();
          reject(err);
        });
    });
  }

  setClassById(id, update, cachePath, collection, ref): Promise<any> {
    return new Promise((resolve, reject) => {
      this.cacheHelper.getterCache(cachePath).then((cache) => {
        if (!cache || update) {
          this.crudHelper
            .getHttp(collection, id, ref)
            .then((http) => {
              this.cacheHelper.setterCache(http, cachePath);
              resolve(http);
            })
            .catch((err) => {
              console.warn(err);
              reject(err);
            });
        } else {
          this.cacheHelper
            .getterCache(cachePath)
            .then((cache) => {
              resolve(cache);
            })
            .catch(() => {
              console.warn('Failed to update');
              resolve(cache);
            });
        }
      });
    });
  }

  setClassAll(update, cachePath, collection): Promise<any> {
    return new Promise((resolve, reject) => {
      this.cacheHelper.getterCache(cachePath).then((cache) => {
        if (!cache || update) {
          this.crudHelper
            .getAllHttp(collection)
            .then((http) => {
              this.cacheHelper.setterCache(http, cachePath).then(() => {
                resolve(http);
              });
            })
            .catch((err) => {
              console.warn(err);
              reject(err);
            });
        } else {
          this.cacheHelper
            .getterCache(cachePath)
            .then((cache) => {
              resolve(cache);
            })
            .catch(() => {
              console.warn('Failed to update');
              resolve(cache);
            });
        }
      });
    });
  }
}
