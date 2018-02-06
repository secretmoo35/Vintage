import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides } from 'ionic-angular';

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
  tabs: any = '0';
  paymentDetail: any = {
    paymenttype: '',
    creditno: '',
    creditname: '',
    expdate: '',
    creditcvc: null
  };
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
  ]
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StepOrderPage');
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
  }

  slideNext() {
    this.formWizard.lockSwipes(false);
    this.formWizard.slideNext();
    this.formWizard.lockSwipes(true);
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

  selectMetthod(e) {
    console.log(e);
  }

  selectBanking(banking) {
    console.log(banking);
  }

  clickConfirmed() {

  }

}
