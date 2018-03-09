import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ShopListModel, ShopListMasterModel } from '../../models/shop-list.model';
import 'rxjs/add/operator/toPromise';
import { AuthProvider } from '../auth/auth';
import { ShopModel } from '../../models/shop.model';

/*
  Generated class for the ShopListProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ShopListProvider {

  constructor(public http: HttpClient, public auth: AuthProvider) {
    // console.log('Hello ShopListProvider Provider');
  }

  getShop(page): Promise<ShopListMasterModel> {
    return this.http.get(this.auth.API_URL + '/api/getshoplist/' + page)
      .toPromise()
      .then(response => response as ShopListMasterModel)
      .catch(this.handleError);
  }
  
  getShopDetail(shopId): Promise<ShopModel> {
    return this.http.get(this.auth.API_URL + '/api/customershopdetail/' + shopId)
      .toPromise()
      .then(response => response as ShopModel)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }

}
