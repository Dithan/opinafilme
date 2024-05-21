import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MinhacontaPageRoutingModule } from './minhaconta-routing.module';

import { MinhacontaPage } from './minhaconta.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MinhacontaPageRoutingModule
  ],
  declarations: [MinhacontaPage]
})
export class MinhacontaPageModule {}
