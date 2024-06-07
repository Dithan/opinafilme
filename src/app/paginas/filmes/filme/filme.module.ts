import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FilmePageRoutingModule } from './filme-routing.module';

import { FilmePage } from './filme.page';
import { CardAvaliacaoComponent } from 'src/app/componentes/card-avaliacao/card-avaliacao.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FilmePageRoutingModule
  ],
  declarations: [FilmePage, CardAvaliacaoComponent]
})
export class FilmePageModule {}
