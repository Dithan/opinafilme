import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'filmes',
        loadChildren: () =>
          import('../paginas/filmes/filmes.module').then(
            (m) => m.FilmesPageModule
          ),
      },
      {
        path: 'pesquisar',
        loadChildren: () =>
          import('../paginas/pesquisar/pesquisar.module').then(
            (m) => m.PesquisarPageModule
          ),
      },
      {
        path: 'reviews',
        loadChildren: () =>
          import('../paginas/reviews/reviews.module').then(
            (m) => m.ReviewsPageModule
          ),
      },
      {
        path: 'conta',
        loadChildren: () =>
          import('../paginas/conta/conta.module').then(
            (m) => m.ContaPageModule
          ),
      },
      {
        path: '',
        redirectTo: '/tabs/filmes',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/filmes',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
