import { MasterHelperService } from 'src/app/helpers/masterHelper/master-helper.service';
import { AuthService } from 'src/app/services/firebase/auth.service';
import { UpdateBoolean } from './../../interfaces/update/update-bool';
import { Injectable } from '@angular/core';
import { PushService } from '../push/push.service';
import { UpdateInterface } from 'src/app/interfaces/update/update-interface';
import { UserClass } from 'src/app/classes/users/user';

@Injectable({
  providedIn: 'root',
})
export class MasterService {
  constructor(
    private master: MasterHelperService,
    private auth: AuthService,
    private userClass: UserClass
  ) {}

  setUser(id: string) {
    this.master
      .setClass(
        id,
        true,
        this.userClass.cachePathMyUser,
        this.userClass.collection,
        this.userClass.ref
      )
      .then((res) => {
        if (res) {
          this.userClass.set(res);
          // this.auth.auth.currentUser.getIdTokenResult().then((token) => {
          //   console.log(token);
          // });
          // this.push.init();
        }
      });
  }

  makeUpdate(shouldUpdate) {
    let data: UpdateInterface = {};
    for (const a in shouldUpdate) {
      const obj = shouldUpdate[a];
      if (a !== 'id') {
        data[a] = obj;
      }
    }
    return data;
  }

  // checkUpdate(shouldUpdate: UpdateInterface): Promise<any> {
  //   return new Promise((resolve, reject) => {
  //     const data = this.makeUpdate(shouldUpdate);
  //     console.log(data);
  //     let shouldUpdateFinal: any = [];
  //     const oldData = this.updateManager.getOld();
  //     if (oldData && Object.keys(data).length > 0) {
  //       data.Banner !== oldData.Banner
  //         ? (shouldUpdateFinal.Banner = true)
  //         : (shouldUpdateFinal.Banner = false);

  //       data.Conveniencia !== oldData.Conveniencia
  //         ? (shouldUpdateFinal.Conveniencia = true)
  //         : (shouldUpdateFinal.Conveniencia = false);

  //       data.Elenco !== oldData.Elenco
  //         ? (shouldUpdateFinal.Elenco = true)
  //         : (shouldUpdateFinal.Elenco = false);

  //       data.Noticia !== oldData.Noticia
  //         ? (shouldUpdateFinal.Noticia = true)
  //         : (shouldUpdateFinal.Noticia = false);

  //       data.Playlist !== oldData.Playlist
  //         ? (shouldUpdateFinal.Playlist = true)
  //         : (shouldUpdateFinal.Playlist = false);

  //       data.Propaganda !== oldData.Propaganda
  //         ? (shouldUpdateFinal.Propaganda = true)
  //         : (shouldUpdateFinal.Propaganda = false);

  //       data.PlaylistExclusiva !== oldData.PlaylistExclusiva
  //         ? (shouldUpdateFinal.PlaylistExclusiva = true)
  //         : (shouldUpdateFinal.PlaylistExclusiva = false);
  //       resolve(shouldUpdateFinal);
  //     } else {
  //       resolve(false);
  //     }
  //   });
  // }

  // set(api = true) {
  //   this.updateManager.setClass().then((shouldUpdate: UpdateInterface) => {
  //     this.checkUpdate(shouldUpdate).then((res: UpdateBoolean) => {
  //       this.bannerclass.setClass(shouldUpdate !== false ? res.Banner : false);
  //       this.adClass.setClass(shouldUpdate !== false ? res.Propaganda : false);
  //       this.adconvClass.setClass(
  //         shouldUpdate !== false ? res.Conveniencia : false
  //       );
  //       this.playlistClass.setClass(
  //         shouldUpdate !== false ? res.Playlist : false
  //       );
  //       this.noticiaLengthClass
  //         .setClass(shouldUpdate !== false ? res.Noticia : false)
  //         .then(() => {
  //           this.noticiaClass.setClass(
  //             shouldUpdate !== false ? res.Noticia : false
  //           );
  //         });
  //       this.elencoClas.setClass(shouldUpdate !== false ? res.Elenco : false);
  //       this.youtubeApi.setClass();
  //     });
  //   });
  //   if (api) {
  //     this.apiFootball.setClass();
  //   }
  // }
}
