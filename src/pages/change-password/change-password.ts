import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ChangePasswordModel } from '../../models/changepassword.model';
import { AuthProvider } from '../../providers/auth/auth';

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
    public authChangePassword:AuthProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChangePasswordPage');
  }

  changePassword(e) {
    console.log(e);
    this.authChangePassword.changPassword(e)
  }

}
