import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { LoadingProvider } from '../../providers/loading/loading';

/**
 * Generated class for the SearchResultPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search-result',
  templateUrl: 'search-result.html',
})
export class SearchResultPage {
  type: string = 'SHOP';
  search: any;
  title: string;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private loading: LoadingProvider,
    private modalCtrl: ModalController
  ) {
    this.search = this.navParams.get('items');
    this.title = this.navParams.get('keyword');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchResultPage');
  }

  selectTabs() {
    this.loading.onLoading();
    this.loading.dismiss();
  }

  goToDetail(e) {
    this.navCtrl.push('ShopPage', e._id);
  }

  gotoDetail(item) {
    let modal1 = this.modalCtrl.create('ProductDetailPage', { productId: item._id });
    modal1.present();
  }

}
