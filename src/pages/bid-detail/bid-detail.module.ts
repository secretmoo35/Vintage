import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BidDetailPage } from './bid-detail';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    BidDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(BidDetailPage),
    TranslateModule.forChild()
  ],
})
export class BidDetailPageModule {}
