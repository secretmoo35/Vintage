import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, Platform, AlertController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { LoadingProvider } from '../../providers/loading/loading';
import { AlertProvider } from '../../providers/alert/alert';
import { TranslateService } from '@ngx-translate/core';
import { ImagePicker } from '@ionic-native/image-picker';
import { Crop } from '@ionic-native/crop';
import { Camera, CameraOptions } from '@ionic-native/camera';
import * as firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-register-profile',
  templateUrl: 'register-profile.html',
})
export class RegisterProfilePage {

  inApp: Boolean = false;
  birthday: string;
  provider: string;
  user: any = {};
  isDisabled: boolean = false;
  language: string = '';
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private auth: AuthProvider,
    private loading: LoadingProvider,
    private translate: TranslateService,
    private alert: AlertProvider,
    private platform: Platform,
    private imagePicker: ImagePicker,
    private crop: Crop,
    private alertCtrl: AlertController,
    private camera: Camera,
    private actionSheetCtrl: ActionSheetController
  ) {

    this.inApp = this.navParams.data ? this.navParams.data.inApp : false;
    this.provider = this.navParams.get('provider');
    if (this.provider === 'fb') {
      let fb_user = this.navParams.get('data');
      this.user.username = fb_user.username;
      this.user.password = fb_user.password;
      this.user.profileImageURL = fb_user.picture.data.url;
      this.user.firstName = fb_user.first_name;
      this.user.lastName = fb_user.last_name;
      this.user.gender = fb_user.gender;
      this.user.email = fb_user.email;
      this.user.provider = 'facebook';
      this.birthday = fb_user.birthday ? new Date(fb_user.birthday).toISOString() : '';

    } else if (this.provider === 'local') {
      this.user = this.navParams.get('data');
      this.user.profileImageURL = 'https://eatsyd.herokuapp.com/modules/users/client/img/profile/default.png';
    }
    this.isDisabled = this.user.email ? true : false;
  }


  ionViewWillEnter() {
    // this.promotionInterest();
    // this.changeShopInterest();
    this.onLanguage();
  }

  onLanguage() {
    this.language = this.translate.currentLang;
  }

  onRegister() {

    let date = new Date(this.birthday);
    this.user.dateOfBirth = date;
    // this.user.username = this.user.username ? this.user.username : this.user.email;
    this.loading.onLoading();
    this.auth.signup(this.user).then((res) => {
      this.navCtrl.setRoot('NavtabsPage');
      this.loading.dismiss();
    }).catch((err) => {
      let language = this.translate.currentLang;

      if (err.message === 'Please fill a valid email address') {
        if (language === 'th') {
          this.alert.onAlert('สมัครสมาชิก', 'อีเมล์ไม่ถูกต้อง กรุณากรอกให้ถูกต้อง', 'ตกลง');
        } else if (language === 'en') {
          this.alert.onAlert('Register', 'Please fill a valid email address.', 'OK');
        }
      } else if (err.message === 'Email already exists') {
        if (language === 'th') {
          this.alert.onAlert('สมัครสมาชิก', 'อีเมล์นี้มีผู้ใช้งานแล้ว', 'ตกลง');
        } else if (language === 'en') {
          this.alert.onAlert('Register', 'Email already exists.', 'OK');
        }
      } else {
        if (language === 'th') {
          this.alert.onAlert('สมัครสมาชิก', err.message, 'ตกลง');
        } else if (language === 'en') {
          this.alert.onAlert('Register', err.message, 'OK');
        }
      }
      this.loading.dismiss();
    });
  }

  maxLength() {
    if (this.user.mobile.length > 10) {
      setTimeout(() => {
        this.user.mobile = this.user.mobile.substring(0, 10);
      }, 0);
    }
  }

  // upload image
  getImage() {

    let btn1;
    let btn2;
    let language = this.translate.currentLang;
    if (language === 'th') {
      btn1 = 'อัลบั้มรูป';
      btn2 = 'กล้องถ่ายรูป';
    } else {
      btn1 = 'Gallery';
      btn2 = 'Camera';
    }

    let actionSheet = this.actionSheetCtrl.create({
      buttons: [
        {
          text: btn1,
          handler: () => {
            if (this.platform.is('cordova')) {
              this.onImagePicker();
            }
          }
        },
        {
          text: btn2,
          handler: () => {
            if (this.platform.is('cordova')) {
              this.onCamera();
            }
          }
        }
      ]
    });

    actionSheet.present();
  }

  onImagePicker() {
    const options = {
      maximumImagesCount: 1,
      width: 900,
      quality: 70,
      outputType: 0
    };
    this.imagePicker.getPictures(options).then((results) => {
      if (results === 'OK') {
        results = [];
      }
      for (let i = 0; i < results.length; i++) {
        let fileUri = results[i];
        if (this.platform.is('android')) {
          fileUri = 'file://' + fileUri;
        }
        this.resizeImage(fileUri).then((resizeImageData) => {
          this.user.profileImageURL = resizeImageData;
          // alert('ss');
        }, (resizeImageError) => {

          let alert = this.alertCtrl.create({
            title: 'Resize image',
            subTitle: 'Resize image error',
            mode: 'ios',
            buttons: ['OK']
          });
          alert.present();

        });
      }
    });
  }

  onCamera() {
    const options: CameraOptions = {
      quality: 50,
      targetWidth: 900,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {

      this.resizeImage(imageData).then((resizeImageData) => {
        this.user.profileImageURL = resizeImageData;
      }, (resizeImageError) => {

        let alert = this.alertCtrl.create({
          title: 'Resize image',
          subTitle: 'Resize image error',
          mode: 'ios',
          buttons: ['OK']
        });
        alert.present();

      });

    }, (err) => {

    });
  }

  resizeImage(fileUri): Promise<any> {

    return new Promise((resolve, reject) => {
      this.crop.crop(fileUri).then((cropData) => {
        this.uploadImage(cropData).then((uploadImageData) => {
          resolve(uploadImageData);
        }, (uploadImageError) => {
          reject(uploadImageError);
        });
      }, (cropError) => {
        reject(cropError);
      });
    });

  }

  uploadImage(imageString): Promise<any> {

    return new Promise((resolve, reject) => {

      this.loading.onLoading();

      const storageRef = firebase.storage().ref();
      const filename = Math.floor((Date.now() / 1000) + new Date().getUTCMilliseconds());
      let imageRef = storageRef.child(`images/${filename}.png`);
      let parseUpload: any;
      let metadata = {
        contentType: 'image/png',
      };

      let xhr = new XMLHttpRequest();
      xhr.open('GET', imageString, true);
      xhr.responseType = 'blob';
      xhr.onload = (e) => {
        let blob = new Blob([xhr.response], { type: 'image/png' });

        parseUpload = imageRef.put(blob, metadata);
        parseUpload.on('state_changed', (_snapshot) => {
          let progress = (_snapshot.bytesTransferred / _snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (_snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
              console.log('Upload is paused');
              break;
            case firebase.storage.TaskState.RUNNING: // or 'running'
              console.log('Upload is running');
              break;
          }
        },
          (_err) => {
            reject(_err);
            this.loading.dismiss();
          },
          (success) => {
            resolve(parseUpload.snapshot.downloadURL);
            this.loading.dismiss();
          });

      }

      xhr.send();

    });

  }
  // end upload image

}
