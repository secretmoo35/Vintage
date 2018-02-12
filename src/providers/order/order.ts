import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constants } from '../../app/app.constants';
import { AuthProvider } from '../auth/auth';

/*
  Generated class for the OrderProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class OrderProvider {
  API_URL: string = Constants.URL;
  constructor(
    public http: HttpClient,
    public auth: AuthProvider
  ) {

  }

  saveOrder(order) {
    let header = this.auth.setHeader();
    order.name = JSON.parse(window.localStorage.getItem('user@' + this.API_URL)).displayName;
    return this.http.post(this.API_URL + '/api/orders', order, { headers: header })
      .toPromise()
      .then(response => response as any)
      .catch(this.handleError);
  }

  getCoupon(code) {
    let header = this.auth.setHeader();
    return this.http.post(this.API_URL + '/api/getcouponbycode', code, { headers: header })
      .toPromise()
      .then(response => response as Array<any>)
      .catch(this.handleError);
  }

  getOrders() {
    let header = this.auth.setHeader();
    return this.http.get(this.API_URL + '/api/customergetorders', { headers: header })
      .toPromise()
      .then(response => response as Array<any>)
      .catch(this.handleError);
  }

  getOrderDetail(item) {
    let header = this.auth.setHeader();
    return this.http.get(this.API_URL + '/api/getorderdetail/' + item.orderid + '/' + item.itemid, { headers: header })
      .toPromise()
      .then(response => response as Array<any>)
      .catch(this.handleError);
  }

  cancelOrder(body) {
    let header = this.auth.setHeader();
    return this.http.post(this.API_URL + '/api/cancelitem', body, { headers: header })
      .toPromise()
      .then(response => response as Array<any>)
      .catch(this.handleError);
  }

  receiptOrder(body) {
    let header = this.auth.setHeader();
    return this.http.post(this.API_URL + '/api/completeitem', body, { headers: header })
      .toPromise()
      .then(response => response as Array<any>)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    // this.log.errorService('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}
