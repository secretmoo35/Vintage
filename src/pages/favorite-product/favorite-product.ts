import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProductProvider } from '../../providers/product/product';
import { ItemProductModel } from '../../models/shop.model';
import { ModalController } from 'ionic-angular/components/modal/modal-controller';

/**
 * Generated class for the FavoriteProductPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-favorite-product',
  templateUrl: 'favorite-product.html',
})
export class FavoriteProductPage {

  productFavarite: ItemProductModel = new ItemProductModel();

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private productProvider: ProductProvider,
    private modalCtrl: ModalController
  ) {
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad FavoriteProductPage');
  }
  ionViewWillEnter() {
    this.getProductFavarite();
  }

  getProductFavarite() {
    this.productFavarite = this.productProvider.getFavorite();
  }
  selectProduct(e) {
    console.log(e);
    let modal1 = this.modalCtrl.create('ProductDetailPage', { productId: e._id });
    modal1.present();
    modal1.onDidDismiss(() => {
      this.getProductFavarite();
    });
  }

}
