import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App, AlertController } from 'ionic-angular';
import { CartProvider } from '../../providers/cart/cart';
import { CartModel } from '../../models/cart.model';
import { AuthProvider } from '../../providers/auth/auth';
import { TranslateService } from '@ngx-translate/core';

/**
 * Generated class for the CartListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cart-list',
  templateUrl: 'cart-list.html',
})
export class CartListPage {
  cartData: CartModel = new CartModel();
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private cartProvider: CartProvider,
    private auth: AuthProvider,
    private app: App,
    private alertCtrl: AlertController,
    private translate: TranslateService
  ) {
  }

  ionViewWillEnter() {
    this.getCart();
  }

  getCart() {
    this.cartData = this.cartProvider.getCart();
  }

  removeItem(index) {
    let language = this.translate.currentLang;
    let title = '';
    let message = '';
    let cancel = '';
    let ok = '';
    if (language === 'th') {
      title = 'ลบสินค้า';
      message = 'คุณต้องลบสินค้านี้ ออกจากตะกร้าสินค้า?';
      cancel = 'ยกเลิก';
      ok = 'ตกลง';
    } else if (language === 'en') {
      title = 'Remove item';
      message = 'Do you want to remove this item from cart?';
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
            this.cartData.items.splice(index, 1);
            this.countPrice();
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

  countDelete(item) {
    if (item.qty > 1) {
      item.qty--;
      item.amount = item.product.price * item.qty;
    }
    this.countPrice();
  }

  countPlus(item) {
    item.qty++;
    item.amount = item.product.price * item.qty;
    this.countPrice();
  }

  countPrice() {
    this.cartData.qty = 0;
    this.cartData.amount = 0;
    this.cartData.items.forEach((e) => {
      this.cartData.qty += e.qty;
      this.cartData.amount += e.amount;
    });
    this.updateCart();
  }

  updateCart() {
    this.cartProvider.updateCart(this.cartData);
  }

  checkOut() {
    this.updateCart();
    this.auth.authenticated().then((res) => {
      if (res) {
        // this.navCtrl.push('StepOrderPage');
        this.app.getRootNav().push('StepOrderPage');
      } else {
        this.navCtrl.push('LoginPage');
      }
    });
  }

}
