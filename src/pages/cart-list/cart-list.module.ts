import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CartListPage } from './cart-list';
import { TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    CartListPage,
  ],
  imports: [
    IonicPageModule.forChild(CartListPage),
    TranslateModule.forChild(),
    ComponentsModule
  ],
})
export class CartListPageModule {}
