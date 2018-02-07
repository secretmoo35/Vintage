import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, LoadingController, AlertController, ToastController, Events } from 'ionic-angular';
import { GoogleMaps, GoogleMap, LatLng, GoogleMapsEvent } from '@ionic-native/google-maps';
import { NativeGeocoder, NativeGeocoderReverseResult } from '@ionic-native/native-geocoder';
import { TranslateService } from '@ngx-translate/core';
// import { LoadingProvider } from '../../providers/loading/loading';

declare let google: any;

@IonicPage()
@Component({
  selector: 'page-google-maps',
  templateUrl: 'google-maps.html',
})
export class GoogleMapsPage {

  @ViewChild('map') mapElement: ElementRef;
  @ViewChild('places', { read: ElementRef }) places: ElementRef;
  private map: GoogleMap;
  private location: LatLng;
  private address: any = {};
  constructor(
    public navCtrl: NavController,
    public navParam: NavParams,
    public events: Events,
    private platform: Platform,
    private googleMaps: GoogleMaps,
    private nativeGeocoder: NativeGeocoder,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private translate: TranslateService,
    private toastCtrl: ToastController
    // private loading: LoadingProvider
  ) {
  }

  ionViewDidLoad() {
    this.platform.ready().then(() => {
      // this.loading.onLoading();
      setTimeout(() => {
        this.initialMap();
        this.initplaces();
        // this.loading.dismiss();
      }, 500);
    });
  }

  initplaces() {

    let input = this.places.nativeElement.querySelector('.searchbar-input');
    // let input = document.getElementById('places');
    let autocomplete = new google.maps.places.Autocomplete(input);
    google.maps.event.addListener(autocomplete, 'place_changed', () => {
      let place = autocomplete.getPlace();
      this.location = new LatLng(place.geometry.location.lat(), place.geometry.location.lng());
      // this.address = place.name + ' ' + place.formatted_address;
      this.map.setCameraTarget(this.location);
      this.reverseGeocode();
      // this.addMarker();
    });

  }

  initialMap() {
    let element = this.mapElement.nativeElement;
    this.map = this.googleMaps.create(element, {
      controls: {
        compass: true,
        myLocationButton: true,
        indoorPicker: true,
        zoom: true,
      },
      gestures: {
        scroll: true,
        tilt: true,
        rotate: true,
        zoom: true
      },
      camera: {
        bearing: 0,
        tilt: 0,
        zoom: 16
      }
    });

    this.map.one(GoogleMapsEvent.MAP_READY).then(() => {
      this.map.getMyLocation().then((res) => {
        this.location = res.latLng;
        let camera = {
          target: this.location,
          zoom: 16
        }
        this.map.moveCamera(camera);
        this.reverseGeocode();
        this.onMapMove();
        this.onMyLocationClick();
      });
    });
  }

  onMapMove() {
    this.map.on(GoogleMapsEvent.MAP_DRAG_END).subscribe((res) => {
      let location = this.map.getCameraTarget();
      this.location = new LatLng(location.lat, location.lng);
      this.reverseGeocode();
    });
  }

  onMyLocationClick() {
    this.map.on(GoogleMapsEvent.MY_LOCATION_BUTTON_CLICK).subscribe(() => {
      this.map.one(GoogleMapsEvent.CAMERA_MOVE_END).then(() => {
        let location = this.map.getCameraTarget();
        this.location = new LatLng(location.lat, location.lng);
        this.reverseGeocode();
      });
    });
  }

  addMarker() {
    let position = {
      lat: this.location.lat,
      lng: this.location.lng
    };
    let markerOption = {
      icon: {
        url: './assets/icon/map/pin_transparent.png',
        size: {
          width: 40,
          height: 40
        }
      },
      position: position
    }
    this.map.clear();
    this.map.addMarker(markerOption).then((marker) => {

      let loading = this.loadingCtrl.create({
        spinner: 'hide',
        cssClass: 'loading-hide',
        duration: 1,
      });
      loading.present();

    });
  }

  reverseGeocode() {
    this.nativeGeocoder.reverseGeocode(this.location.lat, this.location.lng)
      .then((result: NativeGeocoderReverseResult) => {
        // this.address = '';
        // this.address += (result.subThoroughfare ? result.subThoroughfare + ' ' : '');
        // this.address += (result.thoroughfare ? result.thoroughfare + ' ' : '')
        // this.address += (result.locality ? result.locality + ' ' : '')
        // this.address += (result.subLocality ? result.subLocality + ' ' : '')
        // this.address += (result.subAdministrativeArea ? result.subAdministrativeArea + ' ' : '')
        // this.address += (result.administrativeArea ? result.administrativeArea + ' ' : '')
        // this.address += (result.postalCode ? result.postalCode + ' ' : '')
        // this.address += (result.countryName ? result.countryName : '');
        alert(JSON.stringify(result));
        this.address = {
          address: (result.subThoroughfare ? result.subThoroughfare + ' ' : ''),
          district: (result.subAdministrativeArea ? result.subAdministrativeArea + ' ' : ''),
          subdistrict: (result.locality ? result.locality + ' ' : ''),
          province: (result.administrativeArea ? result.administrativeArea + ' ' : ''),
          postcode: (result.postalCode ? result.postalCode + ' ' : '')
        };

        let loading = this.loadingCtrl.create({
          // spinner: 'hide',
          cssClass: 'loading-hide',
          duration: 1,
        });
        loading.present();
        // this.addMarker();
      })
      .catch((error: any) => console.log('error ' + error));
  }

  updateAddress() {
    let language = this.translate.currentLang;
    let title = '';
    let cancel = '';
    let ok = '';

    if (language === 'th') {
      title = "ที่อยู่ของฉัน"
      cancel = 'ยกเลิก'
      ok = 'ยืนยัน'
    } else if (language === 'en') {
      title = "Address"
      cancel = 'Cancal'
      ok = 'Confirm'
    }

    let alert = this.alertCtrl.create({
      title: title,
      mode: 'ios',
      inputs: [
        {
          name: 'address',
          value: this.address
        }
      ],
      buttons: [
        {
          text: ok,
          handler: data => {
            if (data.address) {
              this.address = data.address;
            } else {
              // invalid login
              return false;
            }
          }
        },
        {
          text: cancel,
          role: 'cancel',
          cssClass: 'cancel',
          handler: data => {

          }
        }
      ]
    });
    alert.present();
  }

  doConfirm() {
    let language = this.translate.currentLang;
    let title = '';
    let cancel = '';
    let ok = '';

    if (language === 'th') {
      title = "ข้อมูลการจัดส่ง"
      cancel = 'ยกเลิก'
      ok = 'ยืนยัน'
    } else if (language === 'en') {
      title = "Contact"
      cancel = 'Cancal'
      ok = 'Confirm'
    }

    let alert = this.alertCtrl.create({
      title: title,
      mode: 'ios',
      enableBackdropDismiss: false,
      inputs: [
        {
          name: 'name',
          placeholder: 'ชื่อ*'
        }, {
          name: 'tel',
          placeholder: 'เบอร์โทร*'
        }, {
          name: 'address',
          placeholder: 'ที่อยู่*',
          value: this.address.address
        }, {
          name: 'district',
          placeholder: 'เขต/อำเภอ*',
          value: this.address.district
        }, {
          name: 'subdistrict',
          placeholder: 'แขวง/ตำบล*',
          value: this.address.subdistrict
        }, {
          name: 'province',
          placeholder: 'จังหวัด*',
          value: this.address.province
        }, {
          name: 'postcode',
          placeholder: 'รหัสไปรษณีย์*',
          value: this.address.postcode
        }
      ],
      buttons: [
        {
          text: ok,
          handler: data => {
            if (data.name && data.tel && data.address && data.district && data.subdistrict && data.province && data.postcode) {
              let addressData = {
                name: data.name,
                tel: data.tel,
                address: {
                  address: data.address,
                  district: data.district,
                  subdistrict: data.subdistrict,
                  province: data.province,
                  postcode: data.postcode
                },
                location: this.location
              };
              let shippingAddress = window.localStorage.getItem('native_map_address_obj') ? JSON.parse(window.localStorage.getItem('native_map_address_obj')) : [];
              shippingAddress.push(addressData);
              window.localStorage.setItem('native_map_address_obj', JSON.stringify(shippingAddress));
              this.events.publish('user:map', addressData);
              this.navCtrl.pop();
            } else {
              let toast = this.toastCtrl.create({
                message: 'คุณกรอกข้อมูลไม่ครบถ้วน',
                duration: 3000,
                position: 'bottom'
              });
              toast.present();
              return false;
            }
          }
        },
        {
          text: cancel,
          role: 'cancel',
          cssClass: 'cancel',
          handler: data => {

          }
        }
      ]
    });
    alert.present();
  }

}
