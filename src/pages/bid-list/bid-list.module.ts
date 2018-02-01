import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BidListPage } from './bid-list';
import { TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    BidListPage,
  ],
  imports: [
    IonicPageModule.forChild(BidListPage),
    TranslateModule.forChild(),
    ComponentsModule
  ],
})
export class BidListPageModule {}
