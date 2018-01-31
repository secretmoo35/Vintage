import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, Tabs, Platform } from 'ionic-angular';

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
  root5 = 'MorePage';

  constructor(
    public navCtrl: NavController,
    private platform: Platform,
    // private toastCtrl: ToastController,
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
          // let language = this.translate.currentLang;
          // let message = '';
          // if (language === 'th') {
          //   message = 'กดปุ่มย้อนกลับอีกครั้ง เพื่อออกจากแอปพลิเคชัน';
          // } else if (language === 'en') {
          //   message = 'Press back again to exit App?'
          // }
          // let toast = this.toastCtrl.create({
          //   message: message,
          //   duration: 3000,
          //   position: 'bottom'
          // });
          // toast.present();
          // lastTimeBackPress = new Date().getTime();
        }
      });
    });
  }

  onReword() {
    this.tabs.select(2);
  }

  onSelectChange(e) {
    if (e === '0') {
      window.localStorage.setItem('current_page_for_login', 'HomePage');
    } else if (e === '1') {
      window.localStorage.setItem('current_page_for_login', 'HomePage');
    } else if (e === '2') {
      window.localStorage.setItem('current_page_for_login', 'HomePage');
    } else if (e === '3') {
      window.localStorage.setItem('current_page_for_login', 'HomePage');
    } else if (e === '4') {
      window.localStorage.setItem('current_page_for_login', 'HomePage');
    }
  }
}
