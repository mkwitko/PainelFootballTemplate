import { ScreenService } from 'src/app/services/screen/screen.service';
import { Component, Input, OnInit } from '@angular/core';
import { WhiteLabelService } from 'src/app/services/white-label/white-label.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() url;
  @Input() menu = true;
  @Input() modal = false;
  @Input() login = false;

  constructor(
    private screen: ScreenService,
    private whiteLabel: WhiteLabelService
  ) {}

  ngOnInit() {}

  close() {
    this.screen.modalController.dismiss();
  }

  notification() {
    this.screen.presentToast(
      'Você não tem nenhuma notificação.',
      '',
      'warning'
    );
  }
}
