import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QuestionAnswersPage } from './question-answers';

@NgModule({
  declarations: [
    QuestionAnswersPage,
  ],
  imports: [
    IonicPageModule.forChild(QuestionAnswersPage),
  ],
})
export class QuestionAnswersPageModule {}
