import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { QuestionModel } from '../../models/question-answers.model';

/*
  Generated class for the QuestionAnswersProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class QuestionAnswersProvider {

  constructor(public http: HttpClient) {
    // console.log('Hello QuestionAnswersProvider Provider');
  }

  getQuestionAnswers(): Promise<Array<QuestionModel>> {
    return this.http.get('./assets/json/question-answers.json')
      .toPromise()
      .then(response => response as Array<QuestionModel>)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }

}
