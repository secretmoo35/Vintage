import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PurchasesDetailPage } from './purchases-detail';

@NgModule({
  declarations: [
    PurchasesDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(PurchasesDetailPage),
  ],
})
export class PurchasesDetailPageModule {}
