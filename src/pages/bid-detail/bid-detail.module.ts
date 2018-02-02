import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BidDetailPage } from './bid-detail';

@NgModule({
  declarations: [
    BidDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(BidDetailPage),
  ],
})
export class BidDetailPageModule {}
