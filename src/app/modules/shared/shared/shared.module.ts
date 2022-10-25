import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserClass } from 'src/app/classes/users/user';
import { MasterHelperService } from 'src/app/helpers/masterHelper/master-helper.service';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [UserClass, MasterHelperService],
})
export class SharedModule {}
