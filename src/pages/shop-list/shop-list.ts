import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ShopListProvider } from '../../providers/shop-list/shop-list';
import { ShopListModel } from '../../models/shop-list.model';
import { LoadingProvider } from '../../providers/loading/loading';

/**
 * Generated class for the ShopListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-shop-list',
  templateUrl: 'shop-list.html',
})
export class ShopListPage {

  shopData: Array<ShopListModel>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public shopList: ShopListProvider,
    private loading: LoadingProvider
  ) {
  }

  ionViewWillEnter() {
    // console.log('ionViewDidLoad ShopListPage');
    this.getListShop();
  }

  getListShop() {
    this.loading.onLoading();
    this.shopList.getShop().then(res => {
      this.loading.dismiss();
      this.shopData = res;
    }, (err) => {
      this.loading.dismiss();
    })
  }

  doRefresh(refresher) {
    this.getListShop();
    refresher.complete();
  }

  shopListId(item) {
    this.navCtrl.push('ShopPage', item._id);
  }

}
