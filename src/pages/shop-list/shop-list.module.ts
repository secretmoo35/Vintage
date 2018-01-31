import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShopListPage } from './shop-list';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    ShopListPage,
  ],
  imports: [
    IonicPageModule.forChild(ShopListPage),
    TranslateModule.forChild()
  ],
})
export class ShopListPageModule {}
