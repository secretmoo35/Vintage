import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController, NavParams } from 'ionic-angular';
import { LoadingProvider } from '../../providers/loading/loading';
import { TranslateService } from '@ngx-translate/core';
import { Constants } from '../../app/app.constants';
import { ShopModel } from '../../models/shop.model';
import { ShopListProvider } from '../../providers/shop-list/shop-list';

import { GalleryModal } from 'ionic-gallery-modal';
import { AlertProvider } from '../../providers/alert/alert';


@IonicPage()
@Component({
  selector: 'page-shop',
  templateUrl: 'shop.html',
})
export class ShopPage {

  shopData: ShopModel = new ShopModel();
  // user: UserModel = new UserModel();
  isO: string;
  index: number = 1;
  selectedCateId: string;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private shop: ShopListProvider,
    private modalCtrl: ModalController,
    private loading: LoadingProvider,
    private translate: TranslateService,
    private alert: AlertProvider,
    // private cartProvider: CartProvider
  ) {
  }

  ionViewWillEnter() {
    // this.user = JSON.parse(window.localStorage.getItem('user@' + Constants.URL));
    this.getShop();
  }

  getShop() {
    let _id = this.navParams.data;
    // console.log(_id);
    this.loading.onLoading();
    // '5a53436b3df1d81300b2659f'
    this.shop.getShopDetail(_id).then((res) => {
      this.shopData = res;
      if (this.shopData.categories[0]) {
        this.selectedCateId = this.shopData.categories[0]._id;
      }
      window.localStorage.setItem('select_shop@' + Constants.URL, JSON.stringify(this.shopData));
      this.checkOpenShop();
      this.onCheckFavorite();
      this.loading.dismiss();
    }, (err) => {
      this.loading.dismiss();
      this.navCtrl.pop();
      let language = this.translate.currentLang;
      if (language === 'th') {
        this.alert.onAlert('ร้านค้า', 'โหลดข้อมูลร้านค้าล้มเหลว', 'ตกลง');
      } else if (language === 'en') {
        this.alert.onAlert('Restaurant', 'Error loading restaurant.', 'OK');
      }
    });
  }

  checkOpenShop() {
    if (this.shopData.isopen) {
      this.isO = 'OPEN';
    } else {
      this.isO = 'CLOSE'
    }
  }

  showPhoto(index) {
    let photos = [];
    for (let i = 0; i < this.shopData.promoteimage.length; i++) {
      let element = this.shopData.promoteimage[i];
      photos.push({
        url: element,
        type: '.png',
      });
    }
    let modal = this.modalCtrl.create(GalleryModal, {
      photos: photos,
      initialSlide: index
    });
    modal.present();
  }

  selectCate(i, cate) {
    this.index = i;
    this.selectedCateId = cate ? cate._id : '';
  }

  selectProduct(e) {
    let modal1 = this.modalCtrl.create('ProductDetailPage', { productId: e._id });
    modal1.present();
  }

  getBadge() {
    // return this.cartProvider.getBadgeCartByShop();
  }

  goToCart() {
    this.navCtrl.push('CartPage');
  }

  seeAllProduct() {
    this.navCtrl.push('ProductListPage', this.shopData._id);
  }

  onCheckFavorite() {
    // this.shopData.isFavorite = this.shop.checkShopsFavorite(this.shopData._id);
  }

  onFavorite() {
    // this.shopData.isFavorite = this.shop.onShopsFavorite(this.shopData);
  }
}
