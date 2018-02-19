import { Component, ViewChild, Renderer } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BidProvider } from '../../providers/bid/bid';
import { BidDetailModel } from '../../models/biddetail.model';
import { AuthProvider } from '../../providers/auth/auth';
import moment from 'moment';
import { LoadingProvider } from '../../providers/loading/loading';
import { Socket } from 'ng-socket-io';
import { Constants } from '../../app/app.constants';
import { UserModel } from '../../models/user.model';
import { AlertProvider } from '../../providers/alert/alert';
import { TranslateService } from '@ngx-translate/core';
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
export class BidDetailPage {

  bidDetailData: BidDetailModel = new BidDetailModel();
  accordion = false;
  user: UserModel = new UserModel();

  @ViewChild('cont') cardContent: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private renderer: Renderer,
    private bidProvider: BidProvider,
    private auth: AuthProvider,
    private socket: Socket,
    private loading: LoadingProvider,
    private alert: AlertProvider,
    private translate: TranslateService,
  ) {
  }

  ionViewWillEnter() {
    this.getBiddetail();
  }

  def() {
    setTimeout(() => {
      if (this.cardContent && this.cardContent.nativeElement !== "undefined") {
        this.renderer.setElementStyle(this.cardContent.nativeElement, "display", "none");
      }
    }, 0);
  }

  toggleAddccoding() {
    if (this.accordion) {
      // this.renderer.setElementStyle(this.cardContent.nativeElement, "max-height", "0px");
      this.renderer.setElementStyle(this.cardContent.nativeElement, "display", "none");
      // this.renderer.setElementStyle(this.cardContent.nativeElement, "webkitTransition", "display 300ms");

    } else {
      this.renderer.setElementStyle(this.cardContent.nativeElement, "max-height", "100%");
      this.renderer.setElementStyle(this.cardContent.nativeElement, "padding", "8px");
      this.renderer.setElementStyle(this.cardContent.nativeElement, "display", "flex");
      // this.renderer.setElementStyle(this.cardContent.nativeElement, "webkitTransition", "display 300ms");
    }
    this.accordion = !this.accordion;
  }

  getBiddetail() {
    this.loading.onLoading();
    this.bidProvider.getBidDetail(this.navParams.get('_id')).then(res => {
      this.loading.dismiss();
      this.bidDetailData = res;
      this.bidDetailData.timeleft = '00:00:00';
      this.startTimer();
      this.def();
      this.socketOn();
    }, (err) => {
      this.loading.dismiss();
      this.navCtrl.pop();
    })
  }

  startTimer() {
    // let data = this.bidDetailData;
    let eventTime: any = new Date(this.bidDetailData.dateend);
    let currentTime: any = new Date(this.bidDetailData.datenow);
    let leftTime = eventTime - currentTime;
    let duration = moment.duration(leftTime, 'milliseconds');
    let interval = 1000;
    let intervalId = setInterval(() => {
      if (duration.asSeconds() < 1) {
        this.bidDetailData.timeleft = '00:00:00';
        clearInterval(intervalId);
      }
      duration = moment.duration(duration.asSeconds() - 1, 'seconds');
      this.bidDetailData.timeleft = ((duration.hours() > 9) ? duration.hours() : '0' + duration.hours()) + ':' + ((duration.minutes() > 9) ? duration.minutes() : '0' + duration.minutes()) + ':' + ((duration.seconds() > 9) ? duration.seconds() : '0' + duration.seconds());
    }, interval);
  }

  getTimeOnly(date) {
    let eventTime = new Date(date);
    return (eventTime.getUTCHours() > 9 ? eventTime.getUTCHours() : '0' + eventTime.getUTCHours()) + ':' + (eventTime.getUTCMinutes() > 9 ? eventTime.getUTCMinutes() : '0' + eventTime.getUTCMinutes());
  }

  doBid() {
    this.auth.authenticated().then((res) => {
      if (!res) {
        this.navCtrl.push('LoginPage');
      } else {
        this.bid();
      }
    });
  }

  // soket

  onSocketConnect() {
    this.socket.connect();
  }

  ionViewWillLeave() {
    this.socket.disconnect();
    this.socket.removeAllListeners();
  }

  bid() {
    this.user = JSON.parse(window.localStorage.getItem('user@' + Constants.URL));
    let data = {
      item: this.bidDetailData,
      user: this.user
    }
    this.loading.onLoading();
    this.socket.emit('_bid', data);
  }

  socketOn() {
    this.onSocketConnect();
    this.socket.on(this.bidDetailData._id, (data) => {
      this.loading.dismiss();
      if (data.status === 200) {
        this.bidDetailData.currentuser = data.response.item.currentuser;
        this.bidDetailData.price = data.response.item.price;
      } else if (data.status !== 402) {
        let language = this.translate.currentLang;
        if (language === 'th') {
          this.alert.onAlert('การประมูล', 'เกิดข้อผิดพลาด(' + data.status + ')', 'ตกลง');
        } else if (language === 'en') {
          this.alert.onAlert('Bid', 'error', 'OK');
        }
      } else {
        if (this.user._id === data.user_id) {
          let language = this.translate.currentLang;
          if (language === 'th') {
            this.alert.onAlert('การประมูล', 'หมดเวลาประมูลแล้ว', 'ตกลง');
          } else if (language === 'en') {
            this.alert.onAlert('Bid', 'Time out.', 'OK');
          }
        }
      }
    });
  }


}
