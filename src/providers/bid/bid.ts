import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { BidModel } from '../../models/bid.model';
import { BidDetailModel } from '../../models/biddetail.model';

/*
  Generated class for the BidProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class BidProvider {

  constructor(public http: HttpClient) {
    console.log('Hello BidProvider Provider');
  }

  getBidService(): Promise<BidModel> {
      return this.http.get('./assets/json/bid.json')
      .toPromise()
      .then(response => response as BidModel)
      .catch(this.handleError);
  }

  getBidDetail(): Promise<BidDetailModel> {
    return this.http.get('./assets/json/bid-detail.json')
    .toPromise()
    .then(response => response as BidDetailModel)
    .catch(this.handleError);
}

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }

}
