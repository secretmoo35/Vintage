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
    let user = window.localStorage.getItem('user@' + Constants.URL) ? JSON.parse(window.localStorage.getItem('user@' + Constants.URL)) : null;
    let header = this.auth.setHeader();
    let user_id = user ? user._id : 'nouser';
    return this.http.get(this.API_URL + '/api/getbidlist/' + user_id, { headers: header })
      .toPromise()
      .then(response => response as BidMasterModel)
      .catch(this.handleError);
  }

  getBidDetail(bidId): Promise<BidDetailModel> {
    let header = this.auth.setHeader();
    return this.http.get(this.API_URL + '/api/biddetail/' + bidId, { headers: header })
      .toPromise()
      .then(response => response as BidDetailModel)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }

}
