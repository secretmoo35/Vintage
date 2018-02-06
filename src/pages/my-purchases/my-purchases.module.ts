import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyPurchasesPage } from './my-purchases';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    MyPurchasesPage,
  ],
  imports: [
    IonicPageModule.forChild(MyPurchasesPage),
    TranslateModule.forChild(),
  ],
})
export class MyPurchasesPageModule {}
