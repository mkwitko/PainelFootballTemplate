import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WhiteLabelService {
  public firebase;
  public app = {
    appName: '',
    site: '',
    color: {},
    isWordpress: false,
    painelMenu: [],
    objects: {},
    rotas: [],
    notifyKey: '',
    appId: '',
  };

  constructor() {}
}
