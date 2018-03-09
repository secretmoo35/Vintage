import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content } from 'ionic-angular';
import { ShopListProvider } from '../../providers/shop-list/shop-list';
import { ShopListMasterModel } from '../../models/shop-list.model';
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
  @ViewChild(Content) content: Content;
  shopData: ShopListMasterModel = new ShopListMasterModel();
  page: number = 1;
  maxLimit: number;
  limitItem: number;
  isInfinite: Boolean = true;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public shopList: ShopListProvider,
    private loading: LoadingProvider
  ) {
  }

  ionViewWillEnter() {
    setTimeout(() => {
      this.content.scrollToTop();
    }, 0);
    this.isInfinite = true;    
    this.page = 1;
    this.getListShop();
  }

  getListShop() {
    this.loading.onLoading();
    this.shopList.getShop(this.page).then(res => {
      this.shopData = res;
      this.maxLimit = res.maxLimit;
      this.limitItem = res.limitItem;
      if (this.limitItem >= this.maxLimit) {
        this.isInfinite = false;
      }
      this.loading.dismiss();
    }, (err) => {
      this.loading.dismiss();
    })
  }

  doRefresh(refresher) {
    this.getListShop();
    refresher.complete();
  }

  doInfinite(infiniteScroll) {
    this.page++;
    this.isInfinite = true;
    setTimeout(() => {
      this.getListShop();
      infiniteScroll.complete();
    }, 1000);
  }

  shopListId(item) {
    this.navCtrl.push('ShopPage', item._id);
  }

}
