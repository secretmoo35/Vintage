import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdsImagePage } from './ads-image';
import { PipesModule } from '../../pipes/pipes.module';
import { TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    AdsImagePage,
  ],
  imports: [
    IonicPageModule.forChild(AdsImagePage),
    TranslateModule.forChild(),
    PipesModule,
    ComponentsModule
  ],
})
export class AdsImagePageModule {}
