import { Injectable } from '@angular/core';
import * as Color from 'color';

const defaults = {
  primary: '#3880ff',
  secondary: '#0cd1e8',
  tertiary: '#7044ff',
};

@Injectable({
  providedIn: 'root',
})
export class ColorService {
  constructor() {}

  contrast(color, ratio = 0.8) {
    color = Color(color);
    return color.isDark() ? color.lighten(ratio) : color.darken(ratio);
  }

  CSSTextGenerator(colors) {
    colors = { ...defaults, ...colors };

    const {
      primary,
      secondary,
      tertiary,
      success,
      warning,
      danger,
      dark,
      medium,
      light,
    } = colors;

    const shadeRatio = 0.1;
    const tintRatio = 0.1;

    return `
      --ion-color-primary: ${primary};
      --ion-color-primary-rgb: 56,128,255;
      --ion-color-primary-contrast: ${this.contrast(primary)};
      --ion-color-primary-contrast-rgb: 255,255,255;
      --ion-color-primary-shade:  ${Color(primary).darken(shadeRatio)};
      --ion-color-primary-tint: ${Color(primary).darken(tintRatio)};

      --ion-color-secondary: ${secondary};
      --ion-color-secondary-rgb: 56,128,255;
      --ion-color-secondary-contrast: ${this.contrast(secondary)};
      --ion-color-secondary-contrast-rgb: 255,255,255;
      --ion-color-secondary-shade:  ${Color(secondary).darken(shadeRatio)};
      --ion-color-secondary-tint: ${Color(secondary).darken(tintRatio)};

      --ion-color-tertiary: ${tertiary};
      --ion-color-tertiary-rgb: 56,128,255;
      --ion-color-tertiary-contrast: ${this.contrast(tertiary)};
      --ion-color-tertiary-contrast-rgb: 255,255,255;
      --ion-color-tertiary-shade:  ${Color(tertiary).darken(shadeRatio)};
      --ion-color-tertiary-tint: ${Color(tertiary).darken(tintRatio)};
  
      // omitted other styles, see full source code
  `;
  }

  setTheme(theme) {
    const cssText = this.CSSTextGenerator(theme);
    this.setGlobalCSS(cssText);
  }

  private setGlobalCSS(css: any) {
    document.documentElement.style.cssText = css;
  }
}
