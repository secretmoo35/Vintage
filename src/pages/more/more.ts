import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Constants } from '../../app/app.constants';
import { UserModel } from '../../models/user.model';
import { AuthProvider } from '../../providers/auth/auth';
import { TranslateService } from '@ngx-translate/core';
import { AlertProvider } from '../../providers/alert/alert';

/**
 * Generated class for the MorePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-more',
  templateUrl: 'more.html',
})
export class MorePage {
  user: UserModel = new UserModel();
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private auth: AuthProvider,
    private translate: TranslateService,
    private alertCtrl: AlertProvider
  ) {
  }

  ionViewWillEnter() {
    this.user = JSON.parse(window.localStorage.getItem('user@' + Constants.URL));
  }

  changePassword(){
    
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
    // this.navCtrl.push('QuestionAnswerPage');
  }

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

}
