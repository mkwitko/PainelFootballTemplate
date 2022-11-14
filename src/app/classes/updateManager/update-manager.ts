import { UpdateInterface } from './../../interfaces/update/update-interface';
import { CacheService } from './../../services/cache/cache.service';
import { environment } from 'src/environments/environment';
import { AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { CrudService } from './../../services/crud/crud.service';
import { Injectable } from '@angular/core';
import { ScreenService } from 'src/app/services/screen/screen.service';
import { TranslateService } from 'src/app/services/translate/translate.service';

@Injectable()
export class UpdateManagerClass {
  public minute = 1000 * 60;
  public hour = this.minute * 60;
  public day = this.hour * 24;
  public year = this.day * 365;

  private oldValue: UpdateInterface;
  private value: UpdateInterface;
  private cachePath = environment.global.paths.update;
  private collection: AngularFirestoreCollection;
  private ref = environment.global.paths.update;
  private id: string;

  constructor(private crud: CrudService, private cache: CacheService) {
    this.collection = this.crud.collectionConstructor(this.ref);
  }

  getAllHttp(): Promise<any> {
    return new Promise((resolve) => {
      this.crud.getAll(this.collection).subscribe({
        next: (res) => {
          resolve(res[0]);
        },
        error: (err) => {
          console.warn(err);
        },
      });
    });
  }

  getCache(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.cache
        .get(this.cachePath)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  get() {
    return this.value;
  }

  getOld() {
    return this.oldValue;
  }

  setCache(value: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.cache
        .set(this.cachePath, value)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  set(value) {
    this.value = value;
  }

  setId(value) {
    this.id = value;
  }

  setOld(value) {
    this.oldValue = value;
  }

  checkUpdate(http, cache) {
    if (cache) {
      for (const a in http) {
        if (cache[a] !== http[a] || this.checkByTime(http.All)) {
          return true;
        }
      }
    }
    return false;
  }

  checkByTime(value, time = this.hour * 10) {
    let result = new Date().getTime() > value + time ? true : false;
    return result;
  }

  setClass(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.getCache()
        .then((cache: UpdateInterface) => {
          this.setOld(cache);
          this.getAllHttp()
            .then((http: UpdateInterface) => {
              this.set(http);
              this.setCache(http);
              if (this.checkUpdate(this.get(), this.getOld())) {
                resolve(this.get());
              } else {
                resolve(false);
              }
            })
            .catch((err) => {
              reject(err);
            });
        })
        .catch(() => {
          resolve(false);
        });
    });
  }

  getId(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.crud.getAll(this.collection).subscribe({
        next: (res) => {
          resolve(res[0]);
        },
        error: (err) => {
          reject(err);
        },
      });
    });
  }

  willUpdate(data) {
    this.crud.update(this.collection, data, this.id);
  }
}
