import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShopListPage } from './shop-list';
import { TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    ShopListPage,
  ],
  imports: [
    IonicPageModule.forChild(ShopListPage),
    TranslateModule.forChild(),
    ComponentsModule
  ],
})
export class ShopListPageModule {}
