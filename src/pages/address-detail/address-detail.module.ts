import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddressDetailPage } from './address-detail';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    AddressDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(AddressDetailPage),
    TranslateModule.forChild()
  ],
})
export class AddressDetailPageModule {}
