import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UpdateProfilePage } from './update-profile';
import { TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    UpdateProfilePage,
  ],
  imports: [
    IonicPageModule.forChild(UpdateProfilePage),
    TranslateModule.forChild(),
    ComponentsModule
  ],
})
export class UpdateProfilePageModule {}
