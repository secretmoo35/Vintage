import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Events } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-address-detail',
  templateUrl: 'address-detail.html',
})
export class AddressDetailPage {
  address: any = {
    name: '',
    tel: null,
    address: {
      address: '',
      district: '',
      subdistrict: '',
      province: '',
      postcode: '',
    },
    location: {}
  };
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    private events: Events
  ) {
    this.address = this.navParams.get('address');
  }

  confirmAddress() {
    let shippingAddress = window.localStorage.getItem('native_map_address_obj') ? JSON.parse(window.localStorage.getItem('native_map_address_obj')) : [];
    shippingAddress.push(this.address);
    window.localStorage.setItem('native_map_address_obj', JSON.stringify(shippingAddress));
    window.localStorage.setItem('selectedAddressIndex',(shippingAddress.length - 1).toString());
    this.events.publish('user:map', this.address);
    this.viewCtrl.dismiss(this.address);
  }

  close(){
    this.viewCtrl.dismiss();
  }

}
