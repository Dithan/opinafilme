import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FilmesPage } from './filmes.page';
import { ExploreContainerComponentModule } from '../../explore-container/explore-container.module';

import { FilmesPageRoutingModule } from './filmes-routing.module';
import { CardFilmeComponent } from 'src/app/componentes/card-filme/card-filme.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    FilmesPageRoutingModule,
  ],
  declarations: [FilmesPage, CardFilmeComponent],
})
export class FilmesPageModule {}
