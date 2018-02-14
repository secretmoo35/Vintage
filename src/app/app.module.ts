import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Facebook } from '@ionic-native/facebook';
import { ImagePicker } from '@ionic-native/image-picker';
import { Crop } from '@ionic-native/crop';
import { Camera } from '@ionic-native/camera';
import { OneSignal } from '@ionic-native/onesignal';

import { AuthProvider } from '../providers/auth/auth';
import { LoadingProvider } from '../providers/loading/loading';
import { SearchKeywordProvider } from '../components/search-input/search-input.service';
import { HomeProvider } from '../providers/home/home';
import { BidProvider } from '../providers/bid/bid';
import { AlertProvider } from '../providers/alert/alert';
import { ShopListProvider } from '../providers/shop-list/shop-list';

import * as ionicGalleryModal from 'ionic-gallery-modal';
import { HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { ProductProvider } from '../providers/product/product';
import { CartProvider } from '../providers/cart/cart';
import { OrderProvider } from '../providers/order/order';
import { GoogleMaps } from '@ionic-native/google-maps';
import { NativeGeocoder } from '@ionic-native/native-geocoder';
import { AdsProvider } from '../providers/ads/ads';
import { QuestionAnswersProvider } from '../providers/question-answers/question-answers';
import { OmiseProvider } from '../providers/omise/omise';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { NotificationProvider } from '../providers/notification/notification';

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ionicGalleryModal.GalleryModalModule,
    IonicModule.forRoot(MyApp, {
      backButtonText: '',
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Facebook,
    GoogleMaps,
    NativeGeocoder,
    InAppBrowser,
    ImagePicker,
    Crop,
    Camera,
    OneSignal,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: ionicGalleryModal.GalleryModalHammerConfig,
    },
    AuthProvider,
    LoadingProvider,
    SearchKeywordProvider,
    HomeProvider,
    BidProvider,
    AlertProvider,
    ShopListProvider,
    ProductProvider,
    CartProvider,
    OrderProvider,
    AdsProvider,
    QuestionAnswersProvider,
    OmiseProvider,
    NotificationProvider
  ]
})
export class AppModule { }

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}