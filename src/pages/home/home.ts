import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomeProvider } from '../../providers/home/home';
import { LoadingProvider } from '../../providers/loading/loading';
import { HomeModel } from '../../models/home.model';
@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  homeItem: HomeModel = new HomeModel();
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private home: HomeProvider,
    private loading: LoadingProvider
  ) {
  }

  ionViewWillEnter() {
    this.loadData();
  }

  loadData() {
    this.loading.onLoading();
    this.home.getHomeData().then((res) => {
      this.homeItem = res;
      this.loading.dismiss();
    }, (err) => {
      this.loading.dismiss();
    });
  }

  doRefresh(refresher) {
    this.loadData();
    refresher.complete();
  }

  doBid(item) {

  }

}
