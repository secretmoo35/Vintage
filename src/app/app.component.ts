import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TranslateService } from '@ngx-translate/core';
import { Constants } from './app.constants';

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
    translate: TranslateService
  ) {

    translate.addLangs(['en', 'th']);
    const browserLang = translate.getBrowserLang();
    translate.setDefaultLang(browserLang === 'th' ? 'en' : 'th');
    translate.use(browserLang.match(/en|th/) ? browserLang : 'en');

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
    });
  }
}
