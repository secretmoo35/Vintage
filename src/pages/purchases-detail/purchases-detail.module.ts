import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PurchasesDetailPage } from './purchases-detail';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    PurchasesDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(PurchasesDetailPage),
    TranslateModule.forChild(),
  ],
})
export class PurchasesDetailPageModule {}
