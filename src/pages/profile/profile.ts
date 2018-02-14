import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Constants } from '../../app/app.constants';
import { AuthProvider } from '../../providers/auth/auth';
import { UserModel } from '../../models/user.model';
import { ModalController } from 'ionic-angular/components/modal/modal-controller';
import { ItemProductModel } from '../../models/shop.model';
import { ProductProvider } from '../../providers/product/product';
import { TranslateService } from '@ngx-translate/core';
import { AlertProvider } from '../../providers/alert/alert';
import { NotificationProvider } from '../../providers/notification/notification';

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
  badgeNoti: number = 0;
  segment: String = 'favorte';
  productFavarite: ItemProductModel = new ItemProductModel();
  user: UserModel = new UserModel();
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private auth: AuthProvider,
    private modalCtrl: ModalController,
    private productProvider: ProductProvider,
    private translate: TranslateService,
    private alertCtrl: AlertProvider,
    private notificationProvider: NotificationProvider
  ) {
  }

  ionViewWillEnter() {
    this.user = JSON.parse(window.localStorage.getItem('user@' + Constants.URL));
    this.auth.authenticated().then((res) => {
      if (res) {
        this.user = JSON.parse(window.localStorage.getItem('user@' + Constants.URL));
        this.getProductFavarite();
        this.getBadgeNotification();
      } else {
        // this.navCtrl.push('LoginPage');
      }
    });
  }

  segmentChanged(e) {
    console.log(e);
  }

  profileEdit() {
    console.log(this.user);
    this.navCtrl.push('UpdateProfilePage');
  }

  profileNotifications() {
    this.navCtrl.push('NotificationPage');
  }

  getBadgeNotification() {
    this.notificationProvider.getBadgeNotification().then((data) => {
      this.badgeNoti = data;
    });
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

  //more
  logout() {
    this.auth.logout();
    let language = this.translate.currentLang;
    if (language === 'th') {
      this.alertCtrl.onAlert('ลงชื่อออก สำเร็จ', '', 'ตกลง');
    } else if (language === 'en') {
      this.alertCtrl.onAlert('Logout Success.', '', 'Ok');
    }
    this.user = null;
  }
  changePassword() {
    this.navCtrl.push('ChangePasswordPage');
  }

  onSetting() {
    this.navCtrl.push('SettingDetailPage');
  }

  onBenefit() {
    // this.navCtrl.push('BenefitPage');
  }

  onServiceCharge() {
    // this.navCtrl.push('ServiceChargePage');
  }

  onQA() {
    this.navCtrl.push('QuestionAnswersPage');
  }

  onContact() {
    this.navCtrl.push('ContactPage');
  }

  login() {
    this.navCtrl.push('LoginPage');
  }

  favorite() {
    this.navCtrl.push('FavoriteProductPage');
  }
  myPurchases() {
    this.navCtrl.push('MyPurchasesPage');
  }

}
