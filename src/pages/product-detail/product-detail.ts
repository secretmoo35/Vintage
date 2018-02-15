import { Component, ViewChild, Renderer } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { CartProvider } from '../../providers/cart/cart';
import { LoadingProvider } from '../../providers/loading/loading';
import { ProductDetailModel } from '../../models/product-detail.model';
import { ProductProvider } from '../../providers/product/product';
import { AlertProvider } from '../../providers/alert/alert';
import { TranslateService } from '@ngx-translate/core';
import { Constants } from '../../app/app.constants';
import { UserModel } from '../../models/user.model';

@IonicPage()
@Component({
  selector: 'page-product-detail',
  templateUrl: 'product-detail.html',
})
export class ProductDetailPage {
  @ViewChild('cont') cardContent: any;
  @ViewChild('ship') shipContent: any;

  productData: ProductDetailModel = new ProductDetailModel();
  remark: string = '';
  numberCount: number = 1;
  amount: number = 0;
  user: UserModel = new UserModel();
  accordion = false;
  accordionShip = false;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private viewCtrl: ViewController,
    private cartProvider: CartProvider,
    private productProvider: ProductProvider,
    private loading: LoadingProvider,
    private alert: AlertProvider,
    private translate: TranslateService,
    private renderer: Renderer
  ) {
  }

  ionViewWillEnter() {
    console.log('ionViewDidLoad ProductDetailPage');
    this.user = JSON.parse(window.localStorage.getItem('user@' + Constants.URL));
    this.getProductDetail();
  }

  def() {
    setTimeout(() => {
      if (this.cardContent && this.cardContent.nativeElement !== "undefined") {
        this.renderer.setElementStyle(this.cardContent.nativeElement, "display", "none");
        this.renderer.setElementStyle(this.shipContent.nativeElement, "display", "none");
      }
    }, 0);
  }

  getProductDetail() {
    this.loading.onLoading();
    let productId = this.navParams.get('productId');
    this.productProvider.getProductDetail(productId).then((res) => {
      this.productData = res;
      this.countPrice();
      this.onCheckFavorite();
      this.def();
      this.loading.dismiss();
    }, (err) => {
      this.loading.dismiss();
      this.navCtrl.pop();
      let language = this.translate.currentLang;
      if (language === 'th') {
        this.alert.onAlert('สินค้า', 'โหลดข้อมูลสินค้าล้มเหลว', 'ตกลง');
      } else if (language === 'en') {
        this.alert.onAlert('Product', 'Error loading product.', 'OK');
      }
    });
  }

  toggleAddccoding() {
    if (this.accordion) {
      this.renderer.setElementStyle(this.cardContent.nativeElement, "display", "none");
    } else {
      this.renderer.setElementStyle(this.cardContent.nativeElement, "max-height", "100%");
      this.renderer.setElementStyle(this.cardContent.nativeElement, "padding", "8px");
      this.renderer.setElementStyle(this.cardContent.nativeElement, "display", "flex");
    }
    this.accordion = !this.accordion;
  }

  toggleAddccodingShip() {
    if (this.accordionShip) {
      this.renderer.setElementStyle(this.shipContent.nativeElement, "display", "none");
    } else {
      this.renderer.setElementStyle(this.shipContent.nativeElement, "max-height", "100%");
      this.renderer.setElementStyle(this.shipContent.nativeElement, "padding", "8px");
      this.renderer.setElementStyle(this.shipContent.nativeElement, "display", "flex");
    }
    this.accordionShip = !this.accordionShip;
  }

  countDelete() {
    if (this.numberCount > 1) {
      this.numberCount -= 1;
    }
    this.countPrice();
  }

  countPlus() {
    this.numberCount += 1;
    this.countPrice();
  }

  countPrice() {
    this.amount = this.productData.price * this.numberCount;
  }
  close() {
    this.viewCtrl.dismiss();
  }

  addToCart() {
    let product = {
      product: this.productData,
      // remark: this.remark,
      qty: this.numberCount,
      amount: this.amount
    };
    this.cartProvider.addToCart(product);
    this.viewCtrl.dismiss();
  }


  onCheckFavorite() {
    this.productData.isFavorite = this.productProvider.checkFavorite(this.productData._id);
  }

  onFavorite() {
    this.productData.isFavorite = this.productProvider.onFavorite(this.productData);
  }
}
