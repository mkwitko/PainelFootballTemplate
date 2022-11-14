import { Banners } from 'src/app/classes/banners/banners';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Banner } from 'src/app/interfaces/banner/banner';
import { NavigationService } from 'src/app/services/navigation/navigation.service';
import { MasterHelperService } from 'src/app/helpers/masterHelper/master-helper.service';
import { WhiteLabelService } from 'src/app/services/white-label/white-label.service';
import { ScreenService } from 'src/app/services/screen/screen.service';
import { UpdateManagerClass } from 'src/app/classes/updateManager/update-manager';
import { UpdateInterface } from 'src/app/interfaces/update/update-interface';
import { MasterService } from 'src/app/services/master/master.service';

@Component({
  selector: 'app-banners-crud',
  templateUrl: './banners-crud.page.html',
  styleUrls: ['./banners-crud.page.scss'],
})
export class BannersCrudPage {
  public object: Banner = {
    nome: '',
    onOff: true,
    link: '',
    router: '',
    createdAt: new Date().getTime(),
  };
  public url = 'banners-home';
  private id;
  public fileName = '';
  public uploadFile = null;

  constructor(
    public whiteLabel: WhiteLabelService,
    private myClass: Banners,
    private route: ActivatedRoute,
    private navigation: NavigationService,
    private helper: MasterHelperService,
    private screen: ScreenService,
    private master: MasterService
  ) {
    this.route.queryParams.subscribe((params) => {
      if (params.id) {
        this.id = params.id;
        this.object = this.myClass.find(params.id);
        if (!this.object) {
          this.navigation.goTo(this.url);
        } else {
          if (this.object.downUrl) this.uploadFile = this.object.downUrl;
        }
      }
    });
  }

  change(event) {
    this.uploadFile = event.target.files;
    this.screen.presentToast('Salve para continuar', '1', 'Sucesso!');
  }

  remove() {
    this.uploadFile = null;
    this.fileName = '';
    this.screen.presentToast('Imagem removida com sucesso', '4');
  }

  changeRoute(event) {
    this.object.router = event.detail.value;
  }

  toggle(event) {
    this.object.onOff = event.detail.checked;
  }

  save(): Promise<any> {
    return new Promise((resolve, reject) => {
      if (this.id) {
        if (this.uploadFile) {
          this.helper
            .update(
              this.myClass.collection,
              this.object,
              this.id,
              this.myClass.upper(),
              this.uploadFile !== null && this.uploadFile[0].name !== undefined
                ? this.uploadFile
                : null,
              this.myClass.path
            )
            .then((res) => {
              this.master.set();
              this.navigation.goTo(this.url);
              resolve(res);
            })
            .catch((err) => {
              this.screen.presentToast(
                'Ocorreu um erro inesperado, contate o desenvolvedor.'
              );
              reject(err);
            });
        } else {
          this.screen.presentToast('Obrigatório inserir uma imagem.');
        }
      } else {
        if (this.uploadFile) {
          if (this.uploadFile[0].name) {
            this.helper
              .save(
                this.myClass.collection,
                this.object,
                this.myClass.upper(),
                this.uploadFile,
                this.myClass.path
              )
              .then((res) => {
                this.master.set();
                this.navigation.goTo(this.url);
                resolve(res);
              })
              .catch((err) => {
                this.screen.presentToast(
                  'Ocorreu um erro inesperado, contate o desenvolvedor.'
                );
                reject(err);
              });
          } else {
            this.screen.presentToast(
              'Inserção da imagem não foi bem sucedida. Entre em contato com a administração do Software.'
            );
          }
        } else {
          this.screen.presentToast('Obrigatório inserir uma imagem.');
        }
      }
    });
  }
}
