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
      },
      name: 'INTERNAL_CAMPAIGN_NAME',
    }),
  };

  send(message, filter) {
    let filters = [];
    filter.forEach((element) => {
      element.child.forEach((inputs) => {
        let a = inputs.inputs.filter((find) => find.value === true);
        filters.push({
          return: a[0].return,
          type: element.type,
        });
      });
    });
    let included = filters.filter((a) => a.type === 'base');
    this.http
      .post(
        environment.global.notify.base,
        JSON.stringify({
          included_segments: [included[0].return],
          contents: {
            en: message,
          },
          app_id: this.wl.app.appId,
        }),
        {
          headers: {
            accept: 'application/json',
            Authorization: environment.global.notify.apiKey,
            'content-type': 'application/json',
          },
        }
      )
      .subscribe((res) => {
        console.log(res);
      });
  }

  findDevices() {}
}
