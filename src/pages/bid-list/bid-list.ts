import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BidProvider } from '../../providers/bid/bid';
import { BidModel } from '../../models/bid.model';

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

  bidData:BidModel = new BidModel();
  isBidCheck:boolean = true;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public bid:BidProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BidListPage');
    this.bidLoadData();
  }

  bidLoadData(){
    this.bid.getBidService().then((res)=>{
      this.bidData = res;
      console.log(this.bidData);
    })
  }

}
