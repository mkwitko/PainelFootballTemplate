import { environment } from './../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WhiteLabelService } from '../white-label/white-label.service';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  constructor(private http: HttpClient, private wl: WhiteLabelService) {}

  options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      Authorization: environment.global.notify.apiKey,
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      included_segments: ['Subscribed Users'],
      contents: {
        pt: 'Teste',
        en: 'English or Any Language Message',
        es: 'Spanish Message',
      },
      name: 'INTERNAL_CAMPAIGN_NAME',
    }),
  };

  send(message, filter) {
    console.log(this.target(filter));
    // this.http
    //   .post(
    //     environment.global.notify.base,
    //     JSON.stringify({
    //       included_segments: this.target(filter),
    //       contents: {
    //         en: message,
    //       },
    //       app_id: this.wl.app.appId,
    //     }),
    //     {
    //       headers: {
    //         accept: 'application/json',
    //         Authorization: environment.global.notify.apiKey,
    //         'content-type': 'application/json',
    //       },
    //     }
    //   )
    //   .subscribe((res) => {
    //     console.log(res);
    //   });
  }

  private target(filter) {
    if (!filter) {
      return ['Subscribed Users'];
    } else {
      for (const a of filter) {
        if (a.name === 'Filtros Base') {
          for (const b of a.child) {
            if (b.name === 'Segmentos') {
              let find = b.inputs.find((each) => each.value === true);
              if (find.name === 'Todos Usuários') return ['Subscribed Users'];
              else if (find.name === 'Usuários Ativos') return ['Active Users'];
              else if (find.name === 'Usuários Inativos')
                return ['Inactive Users'];
            }
          }
        }
      }
      return filter;
    }
  }

  findDevices() {}
}
