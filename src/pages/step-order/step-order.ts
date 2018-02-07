import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides } from 'ionic-angular';
import { OrderModel } from '../../models/order.model';
import { CartProvider } from '../../providers/cart/cart';

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
  // 1
  shippingAddress: any;
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
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private cart: CartProvider
  ) {
  }

  ionViewWillEnter() {
    this.isSelectShipping = true;
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
    // console.log(this.order);
  }

  slideNext() {
    this.formWizard.lockSwipes(false);
    this.formWizard.slideNext();
    this.formWizard.lockSwipes(true);

    if (this.formWizard._activeIndex === 3) {
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
      this.orderSummary();
    }
    // console.log(this.order);
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
  }

  openGoogleMap() {
    this.navCtrl.push('GoogleMapsPage');
  }
  // step 1
  // step 2
  loadItems() {
    this.order.items = this.cart.getCart().items;
  }

  checkSelectShipping() {
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
  // step 2
  // step 3
  orderSummary() {
    this.order.amount = 0;
    this.order.shippingamount = 0;
    this.order.discountamount = 0;
    this.order.totalamount = 0;

    this.order.items.forEach((item) => {
      this.order.amount += item.amount;
      this.order.shippingamount += item.shipping.price;
      this.order.totalamount = this.order.amount + this.order.shippingamount;
    });
  }
  // step 3
  // step 4
  clickConfirmed() {

    console.log(this.order);
  }
  // step 4

}
