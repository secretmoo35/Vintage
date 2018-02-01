import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { Constants } from '../../app/app.constants';
import { ProductDetailModel } from '../../models/product-detail.model';

/*
  Generated class for the ProductdetailProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProductProvider {
  API_URL: string = Constants.URL;

  constructor(public http: HttpClient) {
    console.log('Hello ProductdetailProvider Provider');
  }

  getProductDetail(productId): Promise<ProductDetailModel> {
    return this.http.get(this.API_URL + '/api/customerproductdetail/' + productId)
      // return this.http.get('./assets/json/productDetail.json')
      .toPromise()
      .then(response => response as ProductDetailModel)
      .catch(this.handleError);
  }

  getProductsByShop(shopId): Promise<Array<ProductDetailModel>> {
    return this.http.get(this.API_URL + '/api/getproductlistbyshop/' + shopId)
      .toPromise()
      .then(response => response as Array<ProductDetailModel>)
      .catch(this.handleError);
  }

  checkFavorite(productId) {
    let favorite = window.localStorage.getItem('favorite_product@' + Constants.URL) ? JSON.parse(window.localStorage.getItem('favorite_product@' + Constants.URL)) : null;

    if (favorite) {
      let shop = favorite.filter((obj) => obj._id === productId);
      if (shop && shop.length > 0) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }

  }

  onFavorite(product) {
    let favorite = window.localStorage.getItem('favorite_product@' + Constants.URL) ? JSON.parse(window.localStorage.getItem('favorite_product@' + Constants.URL)) : null;
    let res = false;
    if (favorite) {
      let productItem = favorite.filter((obj) => obj._id === product._id);
      if (productItem && productItem.length > 0) {
        favorite.splice(favorite.filter((obj, i) => {
          if (obj._id === product._id) {
            return i;
          }
        }), 1);
        res = false;
      } else {
        product.image = product.images[0];
        favorite.push(product);
        res = true;
      }
    } else {
      product.image = product.coverimage;

      favorite = [product];
      res = true;
    }
    window.localStorage.setItem('favorite_product@' + Constants.URL, JSON.stringify(favorite));
    return res;
  }

  getFavorite() {
    return window.localStorage.getItem('favorite_product@' + Constants.URL) ? JSON.parse(window.localStorage.getItem('favorite_product@' + Constants.URL)) : [];
  }

  private handleError(error: any): Promise<any> {
    // this.log.errorService('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}
