import { SafeUrlService } from './../sanitize/safe-url.service';
import { Injectable } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  constructor(private router: Router, private safe: SafeUrlService) {}

  goTo(url: string) {
    this.router.navigateByUrl(url);
  }

  down(url: string) {
    window.open(url);
  }

  rotaId(rota: string, id: string) {
    const navExtra: NavigationExtras = {
      queryParams: {
        id,
      },
    };
    this.router.navigate(['/' + rota], navExtra);
  }
}
