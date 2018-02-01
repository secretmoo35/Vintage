import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ShopListProvider } from '../../providers/shop-list/shop-list';
import { ShopListModel } from '../../models/shop-list.model';

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

  shopData:Array<ShopListModel>;

  constructor(public navCtrl: NavController, public navParams: NavParams,public shopList:ShopListProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShopListPage');
    this.getListShop();
  }

  getListShop(){
    this.shopList.getShop().then(res=>{
      console.log(res);
      this.shopData = res;
    })
  }

  shopListId(item){
    this.navCtrl.push('ShopPage', item._id);
  }

}
