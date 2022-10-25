import { FooterComponent } from './footer.component';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [FooterComponent],
  imports: [CommonModule, IonicModule],
  exports: [FooterComponent],
  providers: [],
})
export class MyCustomFooter {}
