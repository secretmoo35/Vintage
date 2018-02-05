import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides } from 'ionic-angular';

/**
 * Generated class for the MyPurchasesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-purchases',
  templateUrl: 'my-purchases.html',
})
export class MyPurchasesPage {
  @ViewChild('pageSlider') pageSlider: Slides;
  @ViewChild('pageNav') pageNav: Slides;
  public tabs: any = '0';
  pages: string = '0';
  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyPurchasesPage');
  }

  selectTab(index) {
    this.pageSlider.slideTo(index);
    this.pageNav.slideTo(index);
  }

  changeWillSlide($event) {
    // this.tabs = $event._snapIndex.toString();
    this.tabs = this.pages;
    let page = parseInt(this.tabs)
    let pageNumber = $event._snapIndex;
    if (page < pageNumber) {
      page++;
      this.pages = page.toString();
      let scroll = document.getElementById('scroll');
      scroll.scrollLeft = 100 * page;
    }
  }

}
