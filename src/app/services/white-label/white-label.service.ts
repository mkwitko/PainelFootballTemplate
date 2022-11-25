import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WhiteLabelService {
  public firebase;
  public app = {
    site: '',
    color: {},
    isWordpress: false,
    painelMenu: [],
    rotas: [],
    appId: '',
  };

  constructor() {}
}
