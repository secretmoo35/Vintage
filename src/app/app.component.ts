import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TranslateService } from '@ngx-translate/core';
import { Constants } from './app.constants';
import * as firebase from 'firebase';
import { OneSignal } from '@ionic-native/onesignal';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  // rootPage:any = 'NavtabsPage';
  rootPage: any = 'WalkthroughPage';

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    translate: TranslateService,
    private oneSignal: OneSignal
  ) {
    // Config firebase by google
    let config = {
      apiKey: "AIzaSyCweKU6JKA5Peppq6pVw3Iur7eIyZj7rGc",
      authDomain: "i3chat-75016.firebaseapp.com",
      databaseURL: "https://i3chat-75016.firebaseio.com",
      projectId: "i3chat-75016",
      storageBucket: "i3chat-75016.appspot.com",
      messagingSenderId: "386067578103"
    };
    firebase.initializeApp(config);
    // Translate
    translate.addLangs(['en', 'th']);
    const browserLang = translate.getBrowserLang();
    translate.setDefaultLang(browserLang === 'th' ? 'en' : 'th');
    translate.use(browserLang.match(/en|th/) ? browserLang : 'en');
    // Agreement
    let agr = JSON.parse(window.localStorage.getItem('Agreement@' + Constants.URL));
    if (agr && agr.status) {
      this.rootPage = 'NavtabsPage';
    } else {
      this.rootPage = 'WalkthroughPage';
    }
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      if (platform.is('cordova')) {
        this.onSignalSetup();
      }
    });
  }

  onSignalSetup() {
    this.oneSignal.startInit('d5d9533c-3ac8-42e6-bc16-a5984bef02ff', '687344947918');

    // this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);

    this.oneSignal.handleNotificationReceived().subscribe((onReceived) => {
      // do something when notification is received
      // alert('test');
    });
    this.oneSignal.handleNotificationOpened().subscribe(() => {
      // do something when a notification is opened
    });

    this.oneSignal.endInit();
  }
}
