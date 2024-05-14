import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PesquisarPage } from './pesquisar.page';
import { ExploreContainerComponentModule } from '../../explore-container/explore-container.module';

import { PesquisarPageRoutingModule } from './pesquisar-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    PesquisarPageRoutingModule,
  ],
  declarations: [PesquisarPage],
})
export class PesquisarPageModule {}
