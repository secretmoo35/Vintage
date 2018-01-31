import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { PreloadImageComponent } from './preload-image/preload-image';
import { IonicModule } from 'ionic-angular';
import { GridShopYComponent } from './grid-shop-y/grid-shop-y';
import { Ionic2RatingModule } from 'ionic2-rating';
import { SearchInputComponent } from './search-input/search-input';
import { ListProductComponent } from './list-product/list-product';
import { PipesModule } from '../pipes/pipes.module';
import { GridSpecialComponent } from './grid-special/grid-special';
@NgModule({
	declarations: [
		PreloadImageComponent,
		GridShopYComponent,
    SearchInputComponent,
    ListProductComponent,
    GridSpecialComponent
	],
	imports: [
		IonicModule,
		Ionic2RatingModule,
		TranslateModule.forChild(),
		PipesModule
	],
	exports: [
		PreloadImageComponent,
		GridShopYComponent,
    SearchInputComponent,
    ListProductComponent,
    GridSpecialComponent
	]
})
export class ComponentsModule { }
