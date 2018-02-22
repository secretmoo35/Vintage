import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides, Events, AlertController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser';
import { OrderModel } from '../../models/order.model';
import { CartProvider } from '../../providers/cart/cart';
import { LoadingProvider } from '../../providers/loading/loading';
import { AlertProvider } from '../../providers/alert/alert';
import { OmiseProvider } from '../../providers/omise/omise';
import { Constants } from '../../app/app.constants';
import { OrderProvider } from '../../providers/order/order';

/**
 * Generated class for the StepOrderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-step-order',
  templateUrl: 'step-order.html',
})
export class StepOrderPage {
  @ViewChild('formWizard') formWizard: Slides;
  order: OrderModel = new OrderModel();
  tabs: any = '0';
  channel: string = '';
  // 1
  shippingAddress: any;
  shippingAddressIndex: number;
  // 2
  isSelectShipping: Boolean = true;
  // 3
  paymentType: string = '1';
  bankingType: string = '';
  bankData = [
    {
      name: "BAY",
      image: "./assets/imgs/Internet Banking/krungsri.png"
    },
    {
      name: "BBL",
      image: "./assets/imgs/Internet Banking/Bualuang.png"
    },
    {
      name: "KTB",
      image: "./assets/imgs/Internet Banking/ktb.png"
    },
    {
      name: "SCB",
      image: "./assets/imgs/Internet Banking/scb.png"
    }
  ];
  paymentDetail: any = {
    paymenttype: '',
    creditno: '',
    creditname: '',
    expdate: '',
    creditcvc: null
  };
  omiseKey: any = Constants.OmiseKey;
  couponCode: string = '';
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public events: Events,
    private cart: CartProvider,
    private loading: LoadingProvider,
    private alert: AlertProvider,
    private translate: TranslateService,
    private omiseProvider: OmiseProvider,
    private orderProvider: OrderProvider,
    private iab: InAppBrowser,
    private alertCtrl: AlertController
  ) {
  }

  ionViewWillEnter() {
    this.isSelectShipping = true;
    this.channel = this.navParams.get('channel');
    console.log(this.channel);
    this.loadShippingAddress();
    this.loadItems();
  }

  changeWillSlide($event) {
    this.tabs = $event._snapIndex.toString();
  }

  ngAfterViewInit() {
    this.formWizard.lockSwipes(true);
  }

  slidePrev() {
    this.formWizard.lockSwipes(false);
    this.formWizard.slidePrev();
    this.formWizard.lockSwipes(true);
    console.log(this.order);
  }

  slideNext() {
    this.formWizard.lockSwipes(false);

    if (this.formWizard._activeIndex === 2) {

      if (this.paymentType === '1') {
        this.order.payment = {
          paymenttype: 'Credit card',
          creditno: this.paymentDetail.creditno,
          creditname: this.paymentDetail.creditname,
          expdate: this.paymentDetail.expdate,
          creditcvc: this.paymentDetail.creditcvc
        };
      } else if (this.paymentType === '2') {
        this.order.payment = {
          paymenttype: 'Internet banking',
          creditno: '',
          creditname: '',
          expdate: '',
          creditcvc: ''
        };
      }
      this.onCheckCredit().then((res) => {
        if (res) {
          this.formWizard.slideNext();
          this.orderSummary();
        }
        this.formWizard.lockSwipes(true);
      });
    } else {
      this.formWizard.slideNext();
      this.formWizard.lockSwipes(true);
    }
    // console.log(this.order);
  }

  gotoSlides(index) {
    if (index < this.formWizard._activeIndex) {
      this.formWizard.lockSwipes(false);
      this.formWizard.slideTo(index);
      this.formWizard.lockSwipes(true);
    }
  }

  creditFormat() {
    // let pattern = new RegExp('[0-9]{1,30}');
    if (this.paymentDetail.creditno) {
      if (this.paymentDetail.creditno.length > 16) {
        setTimeout(() => {
          this.paymentDetail.creditno = this.paymentDetail.creditno.substr(0, 16);
        }, 0);
      }
    }

    if (this.paymentDetail.creditcvc) {
      if (this.paymentDetail.creditcvc.length > 3) {
        setTimeout(() => {
          this.paymentDetail.creditcvc = this.paymentDetail.creditcvc.substr(0, 3);
        }, 0);
      }
    }

    if (this.paymentDetail.expdate) {
      setTimeout(() => {
        // this.paymentDetail.expdate = pattern.exec(this.paymentDetail.expdate);
        if (this.paymentDetail.expdate && this.paymentDetail.expdate.length === 4) {
          if (this.paymentDetail.expdate.indexOf('/') === -1) {
            this.paymentDetail.expdate = this.paymentDetail.expdate.substr(0, 2) + '/' + this.paymentDetail.expdate.substr(2, 4);
          }
          this.paymentDetail.expdate = this.paymentDetail.expdate;
        } else if (this.paymentDetail.expdate && this.paymentDetail.expdate.length > 5) {
          setTimeout(() => {
            this.paymentDetail.expdate = this.paymentDetail.expdate.substr(0, 5);
          }, 0);
        }
      }, 0);
    }
  }


  // step 1
  loadShippingAddress() {
    this.shippingAddress = window.localStorage.getItem('native_map_address_obj') ? JSON.parse(window.localStorage.getItem('native_map_address_obj')) : [];
    this.shippingAddressIndex = window.localStorage.getItem('selectedAddressIndex') ? parseInt(window.localStorage.getItem('selectedAddressIndex')) : null;
    this.selectedAddress(this.shippingAddressIndex);
  }

  selectedAddress(index) {
    if (index !== null) {
      window.localStorage.setItem('selectedAddressIndex', index.toString());
      this.order.shippingAddress = this.shippingAddress[index];
      this.shippingAddressIndex = index;
    };
  }

  openGoogleMap() {
    this.events.unsubscribe('user:map');
    this.events.subscribe('user:map', (data) => {
      this.shippingAddress.unshift(data);
    });
    this.navCtrl.push('GoogleMapsPage');
  }

  removeItem(index) {
    window.event.stopPropagation();
    let language = this.translate.currentLang;
    let title = '';
    let message = '';
    let cancel = '';
    let ok = '';
    if (language === 'th') {
      title = 'ลบที่อยู่จัดส่ง';
      message = 'คุณต้องลบที่อยู่จัดส่งนี้?';
      cancel = 'ยกเลิก';
      ok = 'ตกลง';
    } else if (language === 'en') {
      title = 'Remove address';
      message = 'Do you want to remove this address?';
      cancel = 'Cancel';
      ok = 'OK';
    }
    let alert = this.alertCtrl.create({
      title: title,
      message: message,
      mode: 'ios',
      buttons: [
        {
          text: ok,
          cssClass: 'confirm',
          handler: () => {
            if (index === (this.shippingAddress.length - 1)) {
              window.localStorage.removeItem('selectedAddressIndex');
              this.order.shippingAddress = null;
            }
            this.shippingAddress.splice(index, 1);
            window.localStorage.setItem('native_map_address_obj', JSON.stringify(this.shippingAddress));
          }
        },
        {
          text: cancel,
          role: 'cancel',
          cssClass: 'cancel',
          handler: () => {

          }
        }
      ]
    });
    alert.present();
  }
  // step 1
  // step 2
  loadItems() {
    if (this.channel === 'bid') {
      this.order.itemsbid = this.navParams.get('data').itemsbid;
    } else {
      this.order.items = this.cart.getCart().items;
    }
  }

  checkSelectShipping() {
    if (this.channel === 'bid') {
      if (this.order.itemsbid && this.order.itemsbid.length > 0) {
        for (let i = 0; i < this.order.itemsbid.length; i++) {
          const element = this.order.itemsbid[i];
          if (!element.shipping) {
            this.isSelectShipping = true;
            return;
          }
        }
        this.isSelectShipping = false;
      } else {
        this.isSelectShipping = true;
      }
    } else {
      if (this.order.items && this.order.items.length > 0) {
        for (let i = 0; i < this.order.items.length; i++) {
          const element = this.order.items[i];
          if (!element.shipping) {
            this.isSelectShipping = true;
            return;
          }
        }
        this.isSelectShipping = false;
      } else {
        this.isSelectShipping = true;
      }
    }
  }
  // step 2
  // step 3
  onCheckCredit(): Promise<any> {
    return new Promise((resolve, reject) => {

      this.loading.onLoading();

      if (this.order.payment.paymenttype === 'Credit card') {

        this.omiseProvider.getTokenByCredit(this.omiseKey, this.order.payment).then((res: any) => {
          this.loading.dismiss();
          this.order.omiseToken = res.id;
          resolve(true);
        }, (err) => {
          this.loading.dismiss();
          let language = this.translate.currentLang;
          if (language === 'th') {
            this.alert.onAlert('การชำระเงิน', 'บัตรเครดิตไม่ถูกต้อง', 'ตกลง');
          } else if (language === 'en') {
            this.alert.onAlert('Payment', 'Credit Card Error.', 'OK');
          }
          resolve(false);
        });

      } else {
        this.loading.dismiss();
        resolve(true);
      }
    });
  }
  orderSummary() {
    this.order.amount = 0;
    this.order.shippingamount = 0;
    this.order.discountamount = this.order.coupon.discount ? this.order.coupon.discount : 0;
    this.order.totalamount = 0;
    if (this.channel === 'bid') {
      this.order.itemsbid.forEach((item) => {
        this.order.amount += item.amount;
        this.order.shippingamount += item.shipping.price;
        this.order.totalamount = (this.order.amount + this.order.shippingamount) - this.order.discountamount;
      });
    } else {
      this.order.items.forEach((item) => {
        this.order.amount += item.amount;
        this.order.shippingamount += item.shipping.price;
        this.order.totalamount = (this.order.amount + this.order.shippingamount) - this.order.discountamount;
      });
    }
  }
  // step 3
  // step 4
  getCoupon() {
    this.loading.onLoading();
    this.orderProvider.getCoupon({ code: this.couponCode }).then((res) => {
      this.loading.dismiss();
      if (res.status) {
        this.order.coupon.code = res.code;
        this.order.coupon.discount = res.discount;
        this.orderSummary();
      } else {
        let language = this.translate.currentLang;
        if (language === 'th') {
          if (res.message === "Coupon is invalid!") {
            this.alert.onAlert('คูปอง', 'คูปองไม่ถูกต้อง', 'ตกลง');
          } else if (res.message === "Coupon is already") {
            this.alert.onAlert('คูปอง', 'คุณใช้คูปองนี้ไปแล้ว', 'ตกลง');
          } else if (res.message === "Coupon is expired!") {
            this.alert.onAlert('คูปอง', 'คูปองหมดอายุ', 'ตกลง');
          }
        } else if (language === 'en') {

          this.alert.onAlert('Coupon', res.message, 'OK');

        }
      }
    }, (err) => {
      this.loading.dismiss();
    });
  }

  clickConfirmed() {
    if (this.order.payment.paymenttype === 'Internet banking') {
      let bank = '';
      if (this.bankData[this.bankingType].name === 'KTB') {
        bank = 'internet_banking_ktb';
      } else if (this.bankData[this.bankingType].name === 'SCB') {
        bank = 'internet_banking_scb';
      } else if (this.bankData[this.bankingType].name === 'BBL') {
        bank = 'internet_banking_bbl'; //กรุงเทพ
      } else if (this.bankData[this.bankingType].name === 'BAY') {
        bank = 'internet_banking_bay'; //กรุงศรี
      }
      this.loading.onLoading();
      this.omiseProvider.payBanking(this.omiseKey, bank, this.order.totalamount).then((data) => {
        this.loading.dismiss();
        this.order.omiseresponse = data;
        let options: InAppBrowserOptions = {
          location: 'yes',//Or 'no' 
          disallowoverscroll: 'yes',
          enableViewportScale: 'yes'
        };
        this.createOrder();
        this.iab.create(this.order.omiseresponse.authorize_uri, '_blank', options);
      }, (err) => {
        this.loading.dismiss();
        this.alert.onAlert('', JSON.stringify(err), 'OK');
      });
    } else {
      if (this.channel === 'bid') {
        console.log(this.order);
      } else {
        this.createOrder();
      }
    }
  }

  createOrder() {
    this.loading.onLoading();
    this.orderProvider.saveOrder(this.order).then((res) => {
      this.loading.dismiss();
      this.navCtrl.setRoot('NavtabsPage');
      this.cart.clearCart();
      let language = this.translate.currentLang;
      if (language === 'th') {
        this.alert.onAlert('การสั่งซื้อสำเร็จ', 'ขอบคุณที่ใช้บริการ<br>หมายเลขการสั่งซื้อ ' + res.docno, 'ตกลง');
      } else if (language === 'en') {
        this.alert.onAlert('Order success.', 'Thank you.<br>Order no. ' + res.docno, 'OK');
      }
    }, (err) => {
      this.loading.dismiss();
      let language = this.translate.currentLang;
      if (language === 'th') {
        this.alert.onAlert('การสั่งซื้อไม่สำเร็จ', 'เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง', 'ตกลง');
      } else if (language === 'en') {
        this.alert.onAlert('Order failed.', 'Order error. Please try again.', 'OK');
      }
    });
  }
  // step 4

}
