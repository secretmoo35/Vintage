import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FavoriteProductPage } from './favorite-product';
import { TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    FavoriteProductPage,
  ],
  imports: [
    IonicPageModule.forChild(FavoriteProductPage),
    TranslateModule.forChild(),
    ComponentsModule
  ],
})
export class FavoriteProductPageModule {}
