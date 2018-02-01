import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { ProductProvider } from '../../providers/product/product';
import { LoadingProvider } from '../../providers/loading/loading';
import { ProductDetailModel } from '../../models/product-detail.model';

@IonicPage()
@Component({
  selector: 'page-product-list',
  templateUrl: 'product-list.html',
})
export class ProductListPage {
  products: Array<ProductDetailModel> = [];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private product: ProductProvider,
    private loading: LoadingProvider,
    private modalCtrl: ModalController
  ) {
  }

  ionViewDidLoad() {
    this.getProductsByShop();
  }

  getProductsByShop() {
    this.loading.onLoading();
    let shopId = this.navParams.data;
    this.product.getProductsByShop(shopId).then((res) => {
      this.products = res;
      this.loading.dismiss();
    }, (err) => {
      this.loading.dismiss();
    });
  }

  selectProduct(e) {
    console.log(e);
    let modal1 = this.modalCtrl.create('ProductDetailPage', { productId: e._id });
    modal1.present();
  }

  goToCart() {
    this.navCtrl.push('CartPage');
  }

}
