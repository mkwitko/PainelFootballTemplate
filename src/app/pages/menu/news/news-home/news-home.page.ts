import { MasterService } from './../../../../services/master/master.service';
import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { News } from 'src/app/classes/news/news';
import { CrudHelperService } from 'src/app/helpers/crudHelper/crud-helper.service';
import { Noticia } from 'src/app/interfaces/noticia/noticia';
import { WordpressService } from 'src/app/services/apis/wordpress/wordpress.service';
import { NavigationService } from 'src/app/services/navigation/navigation.service';
import { ScreenService } from 'src/app/services/screen/screen.service';
import { WhiteLabelService } from 'src/app/services/white-label/white-label.service';
import { MasterHelperService } from 'src/app/helpers/masterHelper/master-helper.service';

@Component({
  selector: 'app-news-home',
  templateUrl: './news-home.page.html',
  styleUrls: ['./news-home.page.scss'],
})
export class NewsHomePage implements OnInit {
  public modeDelete = false;
  private willDeleteCount = 0;
  private notDeleteCount = 0;

  constructor(
    public newsClass: News,
    public whiteLabel: WhiteLabelService,
    public wordpress: WordpressService,
    private screen: ScreenService,
    private navigation: NavigationService,
    private crud: CrudHelperService,
    private alertController: AlertController,
    private master: MasterHelperService
  ) {}

  ngOnInit() {}

  goTo(id) {
    this.navigation.rotaId('news-crud', id);
  }

  async load() {
    await this.screen.presentLoading();
    let pageCount = this.wordpress.get().length / 10;
    console.log(pageCount);
    this.wordpress
      .getPosts(pageCount + 1)
      .then(() => {
        this.screen.dismissloading();
      })
      .catch((err) => {
        console.warn(err);
        this.screen.dismissloading();
        this.screen.presentToast(
          'Não foi possível retornar as informações do Wordpress. Entre em contato com o desenvolvedor'
        );
      });
  }

  doReorder(ev) {
    const index = this.newsClass.get().length - 1;

    this.newsClass.set(ev.detail.complete(this.newsClass.get()));

    let cont = index;

    for (const a of this.newsClass.get()) {
      a.index = cont;
      cont--;
    }
  }

  markToDel(obj, mode) {
    const slidingItem = document.getElementById(obj.id) as any;
    slidingItem.close();
    if (mode === true) {
      obj.markToDel = true;
      if (this.willDeleteCount === 0) {
        this.screen.presentToast(
          'Item adicionado para deletar. Clique em salvar para confirmar.',
          '1'
        );
      }
      this.willDeleteCount++;
    } else {
      obj.markToDel = false;
      if (this.notDeleteCount === 0) {
        this.screen.presentToast('Item removido da lista de exclusão.', '1');
      }
      this.notDeleteCount++;
    }
  }

  del() {
    let toDelete = this.newsClass
      .get()
      .filter((each) => each.markToDel === true);
    this.crud.deleteMultiple(this.newsClass.collection, toDelete).then(() => {
      this.newsClass.upper();
      this.master
        .setClassAll(true, this.newsClass.path, this.newsClass.collection)
        .then((res) => {
          this.newsClass.set(res);
        });
    });
  }

  // async presentAlertConfirm(obj) {
  //   const alert = await this.alertController.create({
  //     cssClass: 'my-custom-class',
  //     header: 'Atenção!',
  //     message:
  //       'Tem <strong>certeza</strong> que deseja excluir essa notícia? Essa ação é irreversível!',
  //     buttons: [
  //       {
  //         text: 'Cancel',
  //         role: 'cancel',
  //         cssClass: 'secondary',
  //       },
  //       {
  //         text: 'Confirmar',
  //         handler: () => {
  //           this.del(obj);
  //         },
  //       },
  //     ],
  //   });

  //   await alert.present();
  // }

  deleteMode(mode: boolean) {
    this.modeDelete = mode;
    if (!mode) {
      let obj = this.newsClass.get().filter((e) => e.markToDel === true);
      obj.forEach((e) => {
        e.markToDel = false;
      });
    }
  }

  save() {}

  add() {
    this.navigation.goTo('news-crud');
  }
}
