import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import moment from 'moment';
import { BidProvider } from '../../providers/bid/bid';
import { BidMasterModel } from '../../models/bid.model';
import { LoadingProvider } from '../../providers/loading/loading';
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
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private bid: BidProvider,
    private loading: LoadingProvider,
  ) {
  }

  ionViewWillEnter() {
    console.log('ionViewDidLoad BidListPage');
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

  startTimer() {
    // console.log(this.bidData.length);
    this.bidData.items.forEach(element => {
      element.items.forEach((item: any) => {
        let eventTime: any = new Date(item.dateend);
        let currentTime: any = new Date();
        let leftTime = eventTime - currentTime;
        let duration = moment.duration(leftTime, 'milliseconds');
        let interval = 1000;

        let intervalId = setInterval(function () {
          if (duration.asSeconds() <= 0) {
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

  toBidDetail() {
    this.navCtrl.push('BidDetailPage');
  }
}
