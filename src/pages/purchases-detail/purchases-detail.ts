import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { OrderProvider } from '../../providers/order/order';
import { LoadingProvider } from '../../providers/loading/loading';
import { AlertProvider } from '../../providers/alert/alert';

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
    private order: OrderProvider,
    private loading: LoadingProvider,
    private translate: TranslateService,
    private alert: AlertProvider,
    private alertCtrl: AlertController
  ) {
  }

  ionViewWillEnter() {
    this.getOrderDetail();
  }

  getOrderDetail() {
    this.loading.onLoading();
    let item = this.navParams.data;
    this.order.getOrderDetail(item).then((data) => {
      this.loading.dismiss();
      this.orderDetail = data;
    });
  }

  cancelorder() {
    let language = this.translate.currentLang;
    let title = '';
    let message = '';
    let cancel = '';
    let ok = '';
    if (language === 'th') {
      title = 'ยกเลิกสินค้า';
      message = 'คุณต้องการยกเลิกสินค้านี้?';
      cancel = 'ยกเลิก';
      ok = 'ตกลง';
    } else if (language === 'en') {
      title = 'Cancel order';
      message = 'Do you want to cancel this order?';
      cancel = 'Cancel';
      ok = 'OK';
    }
    let alert = this.alertCtrl.create({
      title: title,
      message: message,
      mode: 'ios',
      buttons: [
        {
          text: ok,
          cssClass: 'confirm',
          handler: () => {
            let body = {
              orderid: this.orderDetail.orderid,
              itemid: this.orderDetail.itemid
            };
            this.loading.onLoading();
            this.order.cancelOrder(body).then((data) => {
              this.loading.dismiss();
              this.getOrderDetail();
              // let language = this.translate.currentLang;
              // if (language === 'th') {
              //   this.alert.onAlert('ยกเลิกสินค้า', 'ยกเลิกสินค้าสำเร็จ', 'ตกลง');
              // } else if (language === 'en') {
              //   this.alert.onAlert('Cancel order', 'Success.', 'OK');
              // }
            }, (err) => {
              this.loading.dismiss();
              let language = this.translate.currentLang;
              if (language === 'th') {
                this.alert.onAlert('ยกเลิกสินค้า', 'เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง', 'ตกลง');
              } else if (language === 'en') {
                this.alert.onAlert('Cancel order', 'Order error. Please try again.', 'OK');
              }
            });
          }
        },
        {
          text: cancel,
          role: 'cancel',
          cssClass: 'cancel',
          handler: () => {

          }
        }
      ]
    });
    alert.present();

  }

  received(item) {

    let language = this.translate.currentLang;
    let title = '';
    let message = '';
    let cancel = '';
    let ok = '';
    if (language === 'th') {
      title = 'การรับสินค้า';
      message = 'ยืนยันการรับสินค้า?';
      cancel = 'ยกเลิก';
      ok = 'ตกลง';
    } else if (language === 'en') {
      title = 'Receive order';
      message = 'Receive order.?';
      cancel = 'Cancel';
      ok = 'OK';
    }
    let alert = this.alertCtrl.create({
      title: title,
      message: message,
      mode: 'ios',
      buttons: [
        {
          text: ok,
          cssClass: 'confirm',
          handler: () => {
            let body = {
              orderid: this.orderDetail.orderid,
              itemid: this.orderDetail.itemid
            };
            this.loading.onLoading();
            this.order.receiptOrder(body).then((data) => {
              this.loading.dismiss();
              this.getOrderDetail();
            }, (err) => {
              this.loading.dismiss();
              let language = this.translate.currentLang;
              if (language === 'th') {
                this.alert.onAlert('การรับสินค้า', 'เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง', 'ตกลง');
              } else if (language === 'en') {
                this.alert.onAlert('Receive order', 'Order error. Please try again.', 'OK');
              }
            });
          }
        },
        {
          text: cancel,
          role: 'cancel',
          cssClass: 'cancel',
          handler: () => {

          }
        }
      ]
    });

    alert.present();

  }

}
