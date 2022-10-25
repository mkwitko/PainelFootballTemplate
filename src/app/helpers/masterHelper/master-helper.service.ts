import { Injectable } from '@angular/core';

import { CrudHelperService } from './../crudHelper/crud-helper.service';
import { CacheHelperService } from '../cacheHelper/cache-helper.service';

@Injectable({
  providedIn: 'root',
})
export class MasterHelperService {
  constructor(
    public crudHelper: CrudHelperService,
    public cacheHelper: CacheHelperService
  ) {}

  setClass(id, update, cachePath, collection, ref): Promise<any> {
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
}
