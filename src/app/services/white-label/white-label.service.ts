import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WhiteLabelService {
  public firebase;
  public app = {
    appName: '',
    color: {},
    isWordpress: false,
  };

  constructor() {}
}
