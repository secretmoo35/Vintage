import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AdsDetailModel } from '../../models/ads.model';
import { Constants } from '../../app/app.constants';

/*
  Generated class for the AdsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AdsProvider {
  API_URL: string = Constants.URL;
  constructor(public http: HttpClient) {
    // console.log('Hello AdsProvider Provider');
  }


  getAdsById(_id) {
    return this.http.get(this.API_URL + '/api/ads/' + _id)
      .toPromise()
      .then(response => response as AdsDetailModel)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    // this.log.errorService('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}
