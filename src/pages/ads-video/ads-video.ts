import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ModalController } from 'ionic-angular';
import { AdsDetailModel } from '../../models/ads.model';
import { AdsProvider } from '../../providers/ads/ads';
import { TranslateService } from '@ngx-translate/core';
import { AlertProvider } from '../../providers/alert/alert';
import { LoadingProvider } from '../../providers/loading/loading';

/**
 * Generated class for the AdsVideoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ads-video',
  templateUrl: 'ads-video.html',
})
export class AdsVideoPage {
  adsDetail: AdsDetailModel = new AdsDetailModel();
  _id: string = '';
  video: string = '';
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private viewCtrl: ViewController,
    private modalCtrl: ModalController,
    private ads: AdsProvider,
    private translate: TranslateService,
    private alert: AlertProvider,
    private loading: LoadingProvider
  ) {
    this._id = this.navParams.get('_id');
  }


  ionViewWillEnter() {
    this.getAdsById(this._id);
  }
  getAdsById(_id) {
    this.loading.onLoading();
    this.ads.getAdsById(_id).then((res) => {
      this.adsDetail = res;
      this.video = 'https://www.youtube.com/embed/' + this.adsDetail.videoid + '?autoplay=1rel=0&modestbranding=1';
      this.loading.dismiss();
    }, (err) => {
      this.loading.dismiss();
      let language = this.translate.currentLang;
      if (language === 'th') {
        this.alert.onAlert('แจ้งเตือน', 'โหลดข้อมูลผิดพลาด กรุณาลองอีกครั้ง', 'ตกลง');
      } else if (language === 'en') {
        this.alert.onAlert('Warning', 'Load data error.', 'OK');
      }
    });
  }

  close() {
    this.viewCtrl.dismiss();
  }
}
