import { Component, ViewChild, OnInit, Renderer } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BidProvider } from '../../providers/bid/bid';
import { BidDetailModel } from '../../models/biddetail.model';
import { AuthProvider } from '../../providers/auth/auth';
import moment from 'moment';
import { LoadingProvider } from '../../providers/loading/loading';

/**
 * Generated class for the BidDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-bid-detail',
  templateUrl: 'bid-detail.html',
})
export class BidDetailPage implements OnInit {

  bidDetailData: BidDetailModel = new BidDetailModel();

  accordion = false
  @ViewChild('cc') cardContent: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private renderer: Renderer,
    private bidProvider: BidProvider,
    private auth: AuthProvider,
    private loading: LoadingProvider
  ) {
  }

  ngOnInit() {
    // if (this.cardContent && this.cardContent.nativeElement !== "undefined") {
    //   console.log(this.cardContent.nativeElement);
    //   this.renderer.setElementStyle(this.cardContent.nativeElement, "webkitTransition", "max-height 300ms, padding 300ms");
    // }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BidDetailPage');

  }
  ionViewWillEnter() {

    this.auth.authenticated().then((res) => {
      if (!res) {
        this.navCtrl.push('LoginPage');
      } else {
        this.getBiddetail();
      }
    });
  }

  toggleAddccoding() {
    if (this.accordion) {
      this.renderer.setElementStyle(this.cardContent.nativeElement, "max-height", "0px");
      this.renderer.setElementStyle(this.cardContent.nativeElement, "padding", "0px 16px");

    } else {
      this.renderer.setElementStyle(this.cardContent.nativeElement, "max-height", "500px");
      this.renderer.setElementStyle(this.cardContent.nativeElement, "padding", "13px 16px");
    }
    this.accordion = !this.accordion;
  }

  getBiddetail() {
    this.loading.onLoading();
    this.bidProvider.getBidDetail().then(res => {
      this.loading.dismiss();
      this.bidDetailData = res;
      this.bidDetailData.timeleft = '';
      this.startTimer();
    }, (err) => {
      this.loading.dismiss();
      this.navCtrl.pop();
    })
  }

  startTimer() {
    let data = this.bidDetailData;
    let eventTime: any = new Date(data.dateend);
    let currentTime: any = new Date();
    let leftTime = eventTime - currentTime;
    let duration = moment.duration(leftTime, 'milliseconds');
    let interval = 1000;

    let intervalId = setInterval(function () {
      if (duration.asSeconds() <= 0) {
        clearInterval(intervalId);
      }
      duration = moment.duration(duration.asSeconds() - 1, 'seconds');
      //  duration.days() + ':' + 
      data.timeleft = ((duration.hours() > 9) ? duration.hours() : '0' + duration.hours()) + ':' + ((duration.minutes() > 9) ? duration.minutes() : '0' + duration.minutes()) + ':' + ((duration.seconds() > 9) ? duration.seconds() : '0' + duration.seconds());
    }, interval);
  }

}
