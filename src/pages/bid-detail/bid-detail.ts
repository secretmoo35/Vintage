import { Component, ViewChild, OnInit, Renderer } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the BidDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-bid-detail',
  templateUrl: 'bid-detail.html',
})
export class BidDetailPage implements OnInit {

  accordion = false
  @ViewChild('cc') cardContent: any;
  image = [
    "https://www.sinthanee.com/image/cache/product/2016-11-21/camera/sony/a5100-1000x1000.jpg",
    "https://www.sinthanee.com/image/cache/product/2016-11-21/camera/canon/m10-1000x1000.jpg",
    "https://www.sinthanee.com/image/cache/product/2016-11-21/camera/nikon/coolpix%20s6900-1000x1000.jpg"
  ]

  constructor(public navCtrl: NavController, public navParams: NavParams, public renderer: Renderer) {
  }

  ngOnInit() {
    console.log(this.cardContent.nativeElement);
    this.renderer.setElementStyle(this.cardContent.nativeElement, "webkitTransition", "max-height 300ms, padding 300ms");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BidDetailPage');
  }

  toggleAddccoding() {
    if (this.accordion) {
      this.renderer.setElementStyle(this.cardContent.nativeElement, "max-height", "0px");
      this.renderer.setElementStyle(this.cardContent.nativeElement, "padding", "0px 16px");

    } else {
      this.renderer.setElementStyle(this.cardContent.nativeElement, "max-height", "500px");
      this.renderer.setElementStyle(this.cardContent.nativeElement, "padding", "13px 16px");
    }
    this.accordion = !this.accordion;
  }

}
