import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserModel } from '../../models/user.model';
import { AuthProvider } from '../../providers/auth/auth';
import { TranslateService } from '@ngx-translate/core';
import { AlertProvider } from '../../providers/alert/alert';
import { LoadingProvider } from '../../providers/loading/loading';

/**
 * Generated class for the UpdateProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-update-profile',
  templateUrl: 'update-profile.html',
})
export class UpdateProfilePage {

  user: UserModel = new UserModel();

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public authProvider:AuthProvider,
    private translate: TranslateService,
    private alert: AlertProvider,
    private loading: LoadingProvider,) {

    this.user = this.navParams.get('user');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UpdateProfilePage');
  }

  updateProfile(user){
    let language = this.translate.currentLang;
    console.log(user);

    this.loading.onLoading();
    this.authProvider.updateUser(user).then(res=>{
      this.loading.dismiss();
      if (language === 'th') {
        this.alert.onAlert('แก้ไขข้อมูล', 'แก้ไข ข้อมูลส่วนตัวเรียบร้อย', 'ตกลง');
      } else if (language === 'en') {
        this.alert.onAlert('Edit profile', 'Edit profile complete.', 'OK');
      }
      this.navCtrl.pop();
    }).catch(err=>{
      this.loading.dismiss();
      if (language === 'th') {
        this.alert.onAlert('แก้ไขข้อมูล', 'แก้ไข ข้อมูลส่วนตัวไม่สำเร็จ', 'ตกลง');
      } else if (language === 'en') {
        this.alert.onAlert('Edit profile', 'Edit profile no complete.', 'OK');
      }
    })
  }

  updateProfileBack(){
    
  }

}
