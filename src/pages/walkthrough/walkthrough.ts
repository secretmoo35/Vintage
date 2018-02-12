import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

/**
 * Generated class for the WalkthroughPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-walkthrough',
  templateUrl: 'walkthrough.html',
})
export class WalkthroughPage {
  language: string = '';
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private translate: TranslateService
  ) {
  }

  ionViewDidLoad() {
    this.onLanguage();
  }

  onLanguage() {
    this.language = this.translate.currentLang;
  }

  goToLogin() {
    // this.navCtrl.push('RegisterPage');
    this.navCtrl.push('AgreementPage');
  }

}
