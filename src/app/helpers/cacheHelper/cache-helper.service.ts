import { Injectable } from '@angular/core';
import { CacheService } from 'src/app/services/cache/cache.service';

@Injectable({
  providedIn: 'root',
})
export class CacheHelperService {
  constructor(private cache: CacheService) {}

  /* Cache */
  getterCache(cache): Promise<any> {
    return new Promise((resolve, reject) => {
      this.cache
        .get(cache)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  setterCache(value: any, cache): Promise<any> {
    return new Promise((resolve, reject) => {
      this.cache
        .set(cache, value)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
}
