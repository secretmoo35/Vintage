import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { CartProvider } from '../../providers/cart/cart';
import { LoadingProvider } from '../../providers/loading/loading';
import { ProductDetailModel } from '../../models/product-detail.model';
import { ProductProvider } from '../../providers/product/product';

@IonicPage()
@Component({
  selector: 'page-product-detail',
  templateUrl: 'product-detail.html',
})
export class ProductDetailPage {

  productData: ProductDetailModel = new ProductDetailModel();
  remark: string = '';
  numberCount: number = 1;
  amount: number = 0;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private viewCtrl: ViewController,
    private cartProvider: CartProvider,
    private productProvider: ProductProvider,
    private loading: LoadingProvider
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductDetailPage');
    this.getProductDetail();
  }

  getProductDetail() {
    this.loading.onLoading();
    let productId = this.navParams.get('productId');
    this.productProvider.getProductDetail(productId).then((res) => {
      this.productData = res;
      this.countPrice();
      this.loading.dismiss();
    }, (err) => {
      this.loading.dismiss();
    });
  }

  countDelete() {
    if (this.numberCount > 1) {
      this.numberCount -= 1;
    }
    this.countPrice();
  }

  countPlus() {
    this.numberCount += 1;
    this.countPrice();
  }

  countPrice() {
    this.amount = this.productData.price * this.numberCount;
  }
  close() {
    this.viewCtrl.dismiss();
  }

  addToCart() {
    let product = {
      product: this.productData,
      // remark: this.remark,
      qty: this.numberCount,
      amount: this.amount
    };
    this.cartProvider.addToCart(product);
    this.viewCtrl.dismiss();
  }
}
