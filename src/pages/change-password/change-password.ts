import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ChangePasswordModel } from '../../models/changepassword.model';
import { AuthProvider } from '../../providers/auth/auth';
import { TranslateService } from '@ngx-translate/core';
import { AlertProvider } from '../../providers/alert/alert';
import { LoadingProvider } from '../../providers/loading/loading';

/**
 * Generated class for the ChangePasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-change-password',
  templateUrl: 'change-password.html',
})
export class ChangePasswordPage {

  changPasswordData: ChangePasswordModel = new ChangePasswordModel();
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public authChangePassword:AuthProvider,
    private translate: TranslateService,
    private alert: AlertProvider,
    private loading: LoadingProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChangePasswordPage');
  }

  changePassword(e) {
    let language = this.translate.currentLang;
    console.log(e);
    this.loading.onLoading();
    this.authChangePassword.changPassword(e).then(res=>{
      this.loading.dismiss();
      if (language === 'th') {
        this.alert.onAlert('แก้ไขรหัสผ่าน', 'แก้ไข รหัสผ่านเรียบร้อย', 'ตกลง');
      } else if (language === 'en') {
        this.alert.onAlert('Verify', 'Verify password complete.', 'OK');
      }
      this.navCtrl.pop();
    }).catch(err=>{
      this.loading.dismiss();
      if (language === 'th') {
        this.alert.onAlert('แก้ไขรหัสผ่าน', 'แก้ไข ข้อมูลส่วนตัวไม่สำเร็จ', 'ตกลง');
      } else if (language === 'en') {
        this.alert.onAlert('Verify', 'Verify password no complete.', 'OK');
      }
    })
  }

}
