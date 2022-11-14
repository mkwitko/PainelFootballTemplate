import { Component, OnInit } from '@angular/core';
import { NotificationsService } from 'src/app/services/notifications/notifications.service';
import { ScreenService } from 'src/app/services/screen/screen.service';

@Component({
  selector: 'app-notifications-home',
  templateUrl: './notifications-home.page.html',
  styleUrls: ['./notifications-home.page.scss'],
})
export class NotificationsHomePage {
  public notification = {
    message: '',
    title: '',
  };

  public myFilter = {
    active: true,
    filters: [
      {
        name: 'Filtros Base',
        child: [
          {
            name: 'Segmentos',
            inputs: [
              {
                name: 'Todos Usuários',
                value: true,
                func: this.toggle,
                type: 'toggle',
              },
              {
                name: 'Usuários Ativos',
                value: false,
                func: this.toggle,
                type: 'toggle',
              },
              {
                name: 'Usuários Inativos',
                value: false,
                func: this.toggle,
                type: 'toggle',
              },
            ],
          },
        ],
      },
      {
        name: 'Associados',
        child: [
          {
            name: 'Sócios',
            inputs: [
              {
                name: 'Não Identificados',
                value: true,
                func: this.toggle,
                type: 'toggle',
              },
              {
                name: 'Sócios',
                value: false,
                func: this.toggle,
                type: 'toggle',
              },
              {
                name: 'Não Sócios',
                value: false,
                func: this.toggle,
                type: 'toggle',
              },
            ],
          },
        ],
      },
    ],
  };

  constructor(
    private screen: ScreenService,
    private notify: NotificationsService
  ) {}

  send() {
    if (this.notification.message) {
      this.notify.send(
        this.notification.message,
        this.myFilter.active ? this.myFilter.filters : false
      );
    } else {
      this.screen.presentToast('É obrigatório escrever uma mensagem.');
    }
  }

  toggleFiltering(event) {
    if (event.detail.checked) {
      this.screen.presentToast('Utilização dos Filtros Habilitada', '1');
    } else {
      this.screen.presentToast('Filtros Desligados', '3');
    }
  }

  toggle(event, who, parent) {
    if (who.value) {
      this.screen.presentToast('É necessário manter um dos filtros ativo.');
    }
    parent.inputs.forEach((e) => {
      e.value = false;
    });
  }

  getFunc(which, event, who, parent) {
    if (which === this.toggle) {
      this.toggle(event, who, parent);
    }
  }
}
