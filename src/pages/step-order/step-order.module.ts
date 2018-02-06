import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StepOrderPage } from './step-order';
import { TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    StepOrderPage,
  ],
  imports: [
    IonicPageModule.forChild(StepOrderPage),
    TranslateModule.forChild(),
    ComponentsModule
  ],
})
export class StepOrderPageModule {}
