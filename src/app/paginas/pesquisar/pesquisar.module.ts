import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PesquisarPage } from './pesquisar.page';
import { ExploreContainerComponentModule } from '../../explore-container/explore-container.module';

import { PesquisarPageRoutingModule } from './pesquisar-routing.module';
import { CardFilmePesquisaComponent } from 'src/app/componentes/card-filme-pesquisa/card-filme-pesquisa.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    PesquisarPageRoutingModule,
  ],
  declarations: [PesquisarPage, CardFilmePesquisaComponent],
})
export class PesquisarPageModule {}
