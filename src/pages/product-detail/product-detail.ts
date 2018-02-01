import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { CartProvider } from '../../providers/cart/cart';
import { LoadingProvider } from '../../providers/loading/loading';
import { ProductDetailModel } from '../../models/product-detail.model';
import { ProductProvider } from '../../providers/product/product';
import { AlertProvider } from '../../providers/alert/alert';
import { TranslateService } from '@ngx-translate/core';
import { Constants } from '../../app/app.constants';
import { UserModel } from '../../models/user.model';

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
  user: UserModel = new UserModel();
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private viewCtrl: ViewController,
    private cartProvider: CartProvider,
    private productProvider: ProductProvider,
    private loading: LoadingProvider,
    private alert: AlertProvider,
    private translate: TranslateService
  ) {
  }

  ionViewWillEnter() {
    console.log('ionViewDidLoad ProductDetailPage');
    this.user = JSON.parse(window.localStorage.getItem('user@' + Constants.URL));
    this.getProductDetail();
  }

  getProductDetail() {
    this.loading.onLoading();
    let productId = this.navParams.get('productId');
    this.productProvider.getProductDetail(productId).then((res) => {
      this.productData = res;
      this.countPrice();
      this.onCheckFavorite();
      this.loading.dismiss();
    }, (err) => {
      this.loading.dismiss();
      this.navCtrl.pop();
      let language = this.translate.currentLang;
      if (language === 'th') {
        this.alert.onAlert('สินค้า', 'โหลดข้อมูลสินค้าล้มเหลว', 'ตกลง');
      } else if (language === 'en') {
        this.alert.onAlert('Product', 'Error loading product.', 'OK');
      }
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


  onCheckFavorite() {
    this.productData.isFavorite = this.productProvider.checkFavorite(this.productData._id);
  }

  onFavorite() {
    this.productData.isFavorite = this.productProvider.onFavorite(this.productData);
  }
}
