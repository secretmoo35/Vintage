import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { QuestionAnswersProvider } from '../../providers/question-answers/question-answers';
import { QuestionModel } from '../../models/question-answers.model';
import { TranslateService } from '@ngx-translate/core';

/**
 * Generated class for the QuestionAnswersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-question-answers',
  templateUrl: 'question-answers.html',
})
export class QuestionAnswersPage {

  qas: Array<QuestionModel>;
  shownGroup = null;
  language:any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public QuestionProvider:QuestionAnswersProvider,
    private translate: TranslateService,
  ) {
     
  }

  ionViewWillEnter() {
    this.language = this.translate.currentLang;
    this.getQuestions();
  }

  toggleGroup(group) {
    if (this.isGroupShown(group)) {
      this.shownGroup = null;
    } else {
      this.shownGroup = group;
    }
  };
  isGroupShown(group) {
    return this.shownGroup === group;
  };

  getQuestions(){
    this.QuestionProvider.getQuestionAnswers().then(res=>{
      console.log(res);
      this.qas = res;
    })
  }

}
