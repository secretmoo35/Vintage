import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides, Platform, Content } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { OrderProvider } from '../../providers/order/order';
import { AlertProvider } from '../../providers/alert/alert';
import { LoadingProvider } from '../../providers/loading/loading';

@IonicPage()
@Component({
  selector: 'page-my-purchases',
  templateUrl: 'my-purchases.html',
})
export class MyPurchasesPage {
  @ViewChild('SwipedTabsSlider') SwipedTabsSlider: Slides;
  @ViewChild('MultiItemsScrollingTabs') ItemsTitles: Content;

  SwipedTabsIndicator: any = null;
  tabTitleWidthArray: any = [];
  tabElementWidth_px: number = 50;
  screenWidth_px: number = 0;
  isRight: boolean = true;
  isLeft: boolean = true;
  tabs: any = [];
  orders: any = {};

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public platform: Platform,
    private order: OrderProvider,
    private translate: TranslateService,
    private alert: AlertProvider,
    private loading: LoadingProvider
  ) {
    this.tabs = ["WAIT_SEND", "WAIT_RECEIPT", "COMPLETED", "CANCEL"];
    this.screenWidth_px = platform.width();
  }

  ionViewDidEnter() {
    if (!this.SwipedTabsIndicator) {
      this.SwipedTabsIndicator = document.getElementById("indicator");
      for (let i in this.tabs) this.tabTitleWidthArray.push(document.getElementById("tabTitle" + i).offsetWidth);
      this.selectTab(0);
    }
    this.getOrders();
  }

  scrollIndicatiorTab() {
    this.ItemsTitles.scrollTo(this.calculateDistanceToSpnd(this.SwipedTabsSlider.getActiveIndex()) - this.screenWidth_px / 2, 0);
  }

  selectTab(index) {
    this.SwipedTabsIndicator.style.width = this.tabTitleWidthArray[index] + "px";
    this.SwipedTabsIndicator.style.webkitTransform = 'translate3d(' + (this.calculateDistanceToSpnd(index)) + 'px,0,0)';
    this.SwipedTabsSlider.slideTo(index);
  }

  calculateDistanceToSpnd(index) {
    let result = 0;
    for (let _i = 0; _i < index; _i++) {
      result = result + this.tabTitleWidthArray[_i];
    }
    return result;
  }

  updateIndicatorPosition() {
    let index = this.SwipedTabsSlider.getActiveIndex();
    if (index >= this.tabs.length) {
      this.SwipedTabsSlider.slideTo(index - 1);
      return;
    }

    if (this.SwipedTabsSlider.length() == index) {
      index = index - 1;
    }

    this.SwipedTabsIndicator.style.width = this.tabTitleWidthArray[index] + "px";
    this.SwipedTabsIndicator.style.webkitTransform = 'translate3d(' + (this.calculateDistanceToSpnd(index)) + 'px,0,0)';
  }

  updateIndicatorPositionOnTouchEnd() {
    setTimeout(() => { this.updateIndicatorPosition(); }, 200);
  }

  animateIndicator($event) {
    this.isLeft = false;
    this.isRight = false;
    let currentSliderCenterProgress = (1 / (this.SwipedTabsSlider.length() - 1)) * this.SwipedTabsSlider.getActiveIndex();
    if ($event.progress < currentSliderCenterProgress) {
      this.isLeft = true;
      this.isRight = false;

    } if ($event.progress > currentSliderCenterProgress) {
      this.isLeft = false;
      this.isRight = true;
    }

    if (this.SwipedTabsSlider.isEnd())
      this.isRight = false;

    if (this.SwipedTabsSlider.isBeginning())
      this.isLeft = false;

    if (this.isRight)
      this.SwipedTabsIndicator.style.webkitTransform =
        'translate3d(' + (this.calculateDistanceToSpnd(this.SwipedTabsSlider.getActiveIndex())
          + ($event.progress - currentSliderCenterProgress) * (this.SwipedTabsSlider.length() - 1) * this.tabTitleWidthArray[this.SwipedTabsSlider.getActiveIndex() + 1])
        + 'px,0,0)';

    if (this.isLeft)
      this.SwipedTabsIndicator.style.webkitTransform =
        'translate3d(' + (this.calculateDistanceToSpnd(this.SwipedTabsSlider.getActiveIndex())
          + ($event.progress - currentSliderCenterProgress) * (this.SwipedTabsSlider.length() - 1) * this.tabTitleWidthArray[this.SwipedTabsSlider.getActiveIndex() - 1])
        + 'px,0,0)';

    if (!this.isRight && !this.isLeft)
      this.SwipedTabsIndicator.style.width = this.tabTitleWidthArray[this.SwipedTabsSlider.getActiveIndex()] + "px";

  }

  doRefresh(refresher) {
    this.getOrders();
    refresher.complete();
  }

  getOrders() {
    this.loading.onLoading();
    this.order.getOrders().then((res) => {
      this.loading.dismiss();
      this.orders = res;
    }, (err) => {
      this.loading.dismiss();
      let language = this.translate.currentLang;
      if (language === 'th') {
        this.alert.onAlert('รายการสั่งซื้อ', 'โหลดข้อมูลไม่สำเร็จ', 'ตกลง');
      } else if (language === 'en') {
        this.alert.onAlert('Order fail.', 'Load order fail.', 'OK');
      }
    });
  }

  selectPurchases(item) {
    console.log(item);
    this.navCtrl.push('PurchasesDetailPage', item);
  }

  received(item) {
    let body = {
      orderid: item.orderid,
      itemid: item.itemid
    };
    this.loading.onLoading();
    this.order.receiptOrder(body).then((data) => {
      this.loading.dismiss();
      this.getOrders();
    }, (err) => {
      this.loading.dismiss();
    });
  }

}
