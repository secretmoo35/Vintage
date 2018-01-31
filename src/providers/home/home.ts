import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HomeModel } from '../../models/home.model';

/*
  Generated class for the HomeProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HomeProvider {

  constructor(public http: HttpClient) {
    console.log('Hello HomeProvider Provider');
  }

  getHomeData(): Promise<HomeModel> {
    return this.http.get('./assets/json/home.json')
      .toPromise()
      .then(response => response as HomeModel)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }

}
