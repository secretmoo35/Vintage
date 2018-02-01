import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Constants } from '../../app/app.constants';
import { AuthProvider } from '../../providers/auth/auth';
import { UserModel } from '../../models/user.model';
import { ModalController } from 'ionic-angular/components/modal/modal-controller';
import { ItemProductModel } from '../../models/shop.model';
import { ProductProvider } from '../../providers/product/product';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  segment: String = 'favorte';
  productFavarite: ItemProductModel = new ItemProductModel();
  user: UserModel = new UserModel();
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private auth: AuthProvider,
    private modalCtrl: ModalController,
    private productProvider: ProductProvider
  ) {
  }

  ionViewWillEnter() {
    console.log('ionViewDidLoad ProfilePage');
    this.auth.authenticated().then((res) => {
      if (res) {
        this.user = JSON.parse(window.localStorage.getItem('user@' + Constants.URL));
        this.getProductFavarite();
      } else {
        this.navCtrl.push('LoginPage');
      }
    });
  }

  segmentChanged(e) {
    console.log(e);
  }

  profileSettings() {
    this.navCtrl.push('MorePage');
  }

  profileEdit() {
    // alert("sssss");
  }

  profileNotifications() {
    // alert("sssss");
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
