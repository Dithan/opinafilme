import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FilmesPage } from './filmes.page';

const routes: Routes = [
  {
    path: '',
    component: FilmesPage,
  },
  {
    path: 'filme',
    loadChildren: () => import('./filme/filme.module').then( m => m.FilmePageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FilmesPageRoutingModule {}
