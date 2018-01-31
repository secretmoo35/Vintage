import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CartListPage } from './cart-list';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    CartListPage,
  ],
  imports: [
    IonicPageModule.forChild(CartListPage),
    TranslateModule.forChild()
  ],
})
export class CartListPageModule {}
