import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { BidMasterModel } from '../../models/bid.model';
import { BidDetailModel } from '../../models/biddetail.model';
import { Constants } from '../../app/app.constants';
import { AuthProvider } from '../auth/auth';

/*
  Generated class for the BidProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class BidProvider {
  API_URL: string = Constants.URL;
  constructor(
    public http: HttpClient,
    private auth: AuthProvider    
  ) {
  }

  getBidService(): Promise<BidMasterModel> {
    let header = this.auth.setHeader();
    return this.http.get(this.API_URL + '/api/getbidlist', { headers: header })
      .toPromise()
      .then(response => response as BidMasterModel)
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
