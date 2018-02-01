import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ShopListModel } from '../../models/shop-list.model';
import 'rxjs/add/operator/toPromise';
import { AuthProvider } from '../auth/auth';

/*
  Generated class for the ShopListProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ShopListProvider {

  constructor(public http: HttpClient, public auth: AuthProvider) {
    console.log('Hello ShopListProvider Provider');
  }

  getShop(): Promise<Array<ShopListModel>> {
    return this.http.get(this.auth.API_URL + '/api/getshoplist')
      .toPromise()
      .then(response => response as Array<ShopListModel>)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }

}
