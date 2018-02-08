import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { CartProvider } from '../../providers/cart/cart';
import { CartModel } from '../../models/cart.model';
import { AuthProvider } from '../../providers/auth/auth';

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
    private app: App
  ) {
  }

  ionViewWillEnter() {
    this.getCart();
  }

  getCart() {
    this.cartData = this.cartProvider.getCart();
  }

  removeItem(index) {
    this.cartData.items.splice(index, 1);
    this.countPrice();
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
