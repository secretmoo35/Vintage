import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdsVideoPage } from './ads-video';
import { TranslateModule } from '@ngx-translate/core';
import { PipesModule } from '../../pipes/pipes.module';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    AdsVideoPage,
  ],
  imports: [
    IonicPageModule.forChild(AdsVideoPage), 
    TranslateModule.forChild(),
    PipesModule,
    ComponentsModule
  ],
})
export class AdsVideoPageModule { }
