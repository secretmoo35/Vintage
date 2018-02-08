import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, Tabs, Platform, ToastController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { CartProvider } from '../../providers/cart/cart';

/**
 * Generated class for the NavtabsPage tabs.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-navtabs',
  templateUrl: 'navtabs.html'
})
export class NavtabsPage {
  @ViewChild('tabs') tabs: Tabs

  root1 = 'HomePage';
  root2 = 'ShopListPage';
  root3 = 'BidListPage';
  root4 = 'CartListPage';
  root5 = 'ProfilePage';

  constructor(
    public navCtrl: NavController,
    private platform: Platform,
    private toastCtrl: ToastController,
    private translate: TranslateService,
    private cart: CartProvider
  ) {
    platform.ready().then(() => {
      //back button handle
      //Registration of push in Android and Windows Phone
      var lastTimeBackPress = 0;
      var timePeriodToExit = 2000;

      platform.registerBackButtonAction(() => {
        //Double check to exit app
        if (new Date().getTime() - lastTimeBackPress < timePeriodToExit) {
          this.platform.exitApp(); //Exit from app
        } else {
          let language = this.translate.currentLang;
          let message = '';
          if (language === 'th') {
            message = 'กดปุ่มย้อนกลับอีกครั้ง เพื่อออกจากแอปพลิเคชัน';
          } else if (language === 'en') {
            message = 'Press back again to exit App?'
          }
          let toast = this.toastCtrl.create({
            message: message,
            duration: 3000,
            position: 'bottom'
          });
          toast.present();
          lastTimeBackPress = new Date().getTime();
        }
      });
    });
  }

  ionViewWillEnter(){
    console.log('object');
  }

  onSelectChange(e) {
    if (e === '0') {
      window.localStorage.setItem('current_page_for_login', 'HomePage');
    } else if (e === '1') {
      window.localStorage.setItem('current_page_for_login', 'ShopListPage');
    } else if (e === '2') {
      window.localStorage.setItem('current_page_for_login', 'BidListPage');
    } else if (e === '3') {
      window.localStorage.setItem('current_page_for_login', 'CartListPage');
    } else if (e === '4') {
      window.localStorage.setItem('current_page_for_login', 'ProfilePage');
    }
  }

  getBadge() {
    return this.cart.getCount();
  }
}
