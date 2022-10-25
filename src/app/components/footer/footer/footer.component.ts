import { NavigationService } from 'src/app/services/navigation/navigation.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  @Input() url;

  constructor(private navigation: NavigationService) {}

  ngOnInit() {}

  add() {
    this.navigation.goTo(this.url + '-details');
  }
}
