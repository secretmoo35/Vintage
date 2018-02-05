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

  clickConfirmed() {
    
  }
}
