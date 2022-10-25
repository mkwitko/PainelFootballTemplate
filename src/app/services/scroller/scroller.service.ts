import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ScrollerService {
  constructor() {}

  scroll(id: string) {
    if (id) {
      document.getElementById(id).scrollIntoView({
        behavior: 'auto',
        block: 'start',
        inline: 'nearest',
      });
    }
  }

  isInViewport(id) {
    const element = document.getElementById(id);
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }
}
