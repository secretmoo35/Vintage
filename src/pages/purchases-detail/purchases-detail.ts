import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { OrderProvider } from '../../providers/order/order';

/**
 * Generated class for the PurchasesDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-purchases-detail',
  templateUrl: 'purchases-detail.html',
})
export class PurchasesDetailPage {
  orderDetail: any = {};
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private order: OrderProvider
  ) {
  }

  ionViewWillEnter() {
    this.getOrderDetail();
  }

  getOrderDetail() {
    let item = this.navParams.data;
    this.order.getOrderDetail(item).then((data) => {
      this.orderDetail = data;
    });
  }

}
