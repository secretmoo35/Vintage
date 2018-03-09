import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Content } from 'ionic-angular';
import { HomeProvider } from '../../providers/home/home';
import { LoadingProvider } from '../../providers/loading/loading';
import { HomeModel } from '../../models/home.model';
@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild(Content) content: Content;
  homeItem: HomeModel = new HomeModel();
  page: number = 1;
  maxLimit: number;
  limitItem: number;
  isInfinite: Boolean = true;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private home: HomeProvider,
    private loading: LoadingProvider,
    private modalCtrl: ModalController
  ) {
  }

  ionViewWillEnter() {
    setTimeout(() => {
      this.content.scrollToTop();
    }, 0);
    this.isInfinite = true;
    this.page = 1;
    this.loadData();
  }

  loadData() {
    this.loading.onLoading();
    this.home.getHomeData(this.page).then((res) => {
      this.homeItem = res;
      this.maxLimit = res.maxLimit;
      this.limitItem = res.limitItem;
      if (this.limitItem >= this.maxLimit) {
        this.isInfinite = false;
      }
      this.loading.dismiss();
    }, (err) => {
      this.loading.dismiss();
    });
  }

  doRefresh(refresher) {
    this.homeItem = null;
    setTimeout(() => {
      this.loadData();
      refresher.complete();
    }, 500);
  }

  doInfinite(infiniteScroll) {
    this.page++;
    this.isInfinite = true;
    setTimeout(() => {
      this.loadData();
      infiniteScroll.complete();
    }, 1000);
  }

  selected(e) {
    // console.log(e);
    if (e.type === 'ads') {
      if (e.isvideo) {
        let profileModal = this.modalCtrl.create('AdsVideoPage', { _id: e._id });
        profileModal.present();
      } else {
        let profileModal = this.modalCtrl.create('AdsImagePage', { _id: e._id });
        profileModal.present();
      }
    } else {
      let modal1 = this.modalCtrl.create('ProductDetailPage', { productId: e._id });
      modal1.present();
    }
  }

  toBidDetail(item) {
    this.navCtrl.push('BidDetailPage', { _id: item._id });
  }

}
