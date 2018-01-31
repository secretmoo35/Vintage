import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BidListPage } from './bid-list';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    BidListPage,
  ],
  imports: [
    IonicPageModule.forChild(BidListPage),
    TranslateModule.forChild()
  ],
})
export class BidListPageModule {}
