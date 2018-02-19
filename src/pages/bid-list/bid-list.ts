import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import moment from 'moment';
import { BidProvider } from '../../providers/bid/bid';
import { BidMasterModel } from '../../models/bid.model';
import { LoadingProvider } from '../../providers/loading/loading';
import { UserModel } from '../../models/user.model';
import { Constants } from '../../app/app.constants';
// declare let moment;
/**
 * Generated class for the BidListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-bid-list',
  templateUrl: 'bid-list.html',
})
export class BidListPage {

  bidData: BidMasterModel = new BidMasterModel();
  index: string = '0';
  user: UserModel = new UserModel();
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private bid: BidProvider,
    private loading: LoadingProvider,
  ) {
  }

  ionViewWillEnter() {
    this.user = JSON.parse(window.localStorage.getItem('user@' + Constants.URL));
    if (!this.user) {
      this.index = '0';
    }
    this.bidLoadData();
  }

  bidLoadData() {
    this.loading.onLoading();
    this.bid.getBidService().then((res) => {
      this.bidData = res;
      this.startTimer();
      this.loading.dismiss();
    })
  }

  doRefresh(refresher) {
    this.bidLoadData();
    refresher.complete();
  }

  startTimer() {
    // console.log(this.bidData.length);
    this.bidData.items.forEach(element => {
      element.items.forEach((item: any) => {
        let eventTime: any = new Date(item.dateend);
        let currentTime: any = new Date(this.bidData.datenow);
        let leftTime = eventTime - currentTime;
        let duration = moment.duration(leftTime, 'milliseconds');
        let interval = 1000;

        let intervalId = setInterval(() => {
          if (duration.asSeconds() < 1) {
            item.timeleft = '00:00:00';
            clearInterval(intervalId);
          }
          duration = moment.duration(duration.asSeconds() - 1, 'seconds');

          item.timeleft = ((duration.hours() > 9) ? duration.hours() : '0' + duration.hours()) + ':' + ((duration.minutes() > 9) ? duration.minutes() : '0' + duration.minutes()) + ':' + ((duration.seconds() > 9) ? duration.seconds() : '0' + duration.seconds());
          // item.timeleftH = ((duration.hours() > 9) ? duration.hours() : '0' + duration.hours());
          // item.timeleftM = ((duration.minutes() > 9) ? duration.minutes() : '0' + duration.minutes());
          // item.timeleftS = ((duration.seconds() > 9) ? duration.seconds() : '0' + duration.seconds());
        }, interval);
      });
    });
  }

  getTimeOnly(date) {
    // let eventTime = new Date(date);
    // return (eventTime.getUTCHours() > 9 ? eventTime.getUTCHours() : '0' + eventTime.getUTCHours()) + ':' + (eventTime.getUTCMinutes() > 9 ? eventTime.getUTCMinutes() : '0' + eventTime.getUTCMinutes());
    return moment(date).format("HH:mm");
  }

  selectTabs(i) {
    this.index = i;
  }

  toBidDetail(item) {
    this.navCtrl.push('BidDetailPage', { _id: item._id });
  }
}
