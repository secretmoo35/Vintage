import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BidDetailPage } from './bid-detail';
import { TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    BidDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(BidDetailPage),
    TranslateModule.forChild(),
    ComponentsModule    
  ],
})
export class BidDetailPageModule {}
