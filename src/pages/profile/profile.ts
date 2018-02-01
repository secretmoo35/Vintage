import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  segment: String = 'favorte';
  productFavarite = [
    {
      _id: "5a7055010f14a7130008dd36",
      name: "พุ่มไม้",
      image: "https://firebasestorage.googleapis.com/v0/b/schoolbus-cnet.appspot.com/o/images%2F1517311841.png?alt=media&token=14253f4d-5ed7-4d3c-b462-ada4a8560a20",
      price: 500,
    },
    {
      _id: "5a7054b10f14a7130008dd35",
      name: "ต้นไม้1",
      image: "https://firebasestorage.googleapis.com/v0/b/schoolbus-cnet.appspot.com/o/images%2F1517311713.png?alt=media&token=48a9abd0-511c-4551-99e7-233c2c8852f0",
      price: 250,
    },
    {
      _id: "5a704e0b0f14a7130008dd31",
      name: "เสื้อยืดแขนปีกค้างคาว",
      image: "https://firebasestorage.googleapis.com/v0/b/schoolbus-cnet.appspot.com/o/images%2F1517310304.png?alt=media&token=7d4083af-5722-4e20-b0df-7ee01ee6cba6",
      price: 350,
    },
    {
      _id: "5a704de30f14a7130008dd30",
      name: "เสื้อลำลองผู้หญิง",
      image: "https://firebasestorage.googleapis.com/v0/b/schoolbus-cnet.appspot.com/o/images%2F1517309477.png?alt=media&token=84a77e55-ef8f-4c4b-8cc7-5949b9abdca2",
      price: 450,
    },
    {
      _id: "5a704dca0f14a7130008dd2f",
      name: "เสื้อไหมพรม",
      image: "https://firebasestorage.googleapis.com/v0/b/schoolbus-cnet.appspot.com/o/images%2F1517309881.png?alt=media&token=f3c7f9c7-ca2d-4d25-be19-6b8a0af48671",
      price: 350,
    },
    {
      _id: "5a704cec0f14a7130008dd2c",
      name: "ผ้าพันคอไหมพรม",
      image: "https://firebasestorage.googleapis.com/v0/b/schoolbus-cnet.appspot.com/o/images%2F1517309989.png?alt=media&token=9d2511c7-73f3-42a1-a169-6d740c9bbc3c",
      price: 250,
    },
    {
      _id: "5a704ca20f14a7130008dd2b",
      name: "ผ้าพันคอชีฟองดอกไม้",
      image: "https://firebasestorage.googleapis.com/v0/b/schoolbus-cnet.appspot.com/o/images%2F1517309516.png?alt=media&token=8e58114c-d55a-4e38-bc6d-11ac6ed3528b",
      price: 250,
    }
  ]

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

  segmentChanged(e) {
    console.log(e);
    // if (this.segment === 'favorite') {
    //   this.getShop();
    // }
  }

}
