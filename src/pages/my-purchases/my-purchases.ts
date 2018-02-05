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
  tabs: any = '0';
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyPurchasesPage');
  }

  selectTab(index) {
    this.pageSlider.slideTo(index);
  }

  ionSlidePrevStart($event) {
    let page = parseInt(this.tabs)
    let pageNumber = $event._snapIndex;
    if (page > pageNumber) {
      this.tabs = pageNumber.toString();
      let scroll = document.getElementById('scroll');
      page--;
      let sum = 100 * page;
      let o_scrollLeft = 0;
      let delay = setInterval(() => {
        o_scrollLeft = scroll.scrollLeft;
        scroll.scrollLeft -= 5;
        if (scroll.scrollLeft <= sum || scroll.scrollLeft === o_scrollLeft) {
          clearInterval(delay);
        }
      }, 10);
    }
  }

  ionSlideNextStart($event) {
    let page = parseInt(this.tabs)
    let pageNumber = $event._snapIndex;
    if (page < pageNumber) {
      this.tabs = pageNumber.toString();
      let scroll = document.getElementById('scroll');
      page++;
      let sum = 100 * page;
      let o_scrollLeft = 0;
      scroll.scrollLeft = sum - 100;
      let delay = setInterval(() => {
        o_scrollLeft = scroll.scrollLeft;
        scroll.scrollLeft += 5;
        if (scroll.scrollLeft === sum || scroll.scrollLeft === o_scrollLeft) {
          clearInterval(delay);
        }
      }, 10);
    }
  }

}
