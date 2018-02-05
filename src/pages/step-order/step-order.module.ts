import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StepOrderPage } from './step-order';

@NgModule({
  declarations: [
    StepOrderPage,
  ],
  imports: [
    IonicPageModule.forChild(StepOrderPage),
  ],
})
export class StepOrderPageModule {}
