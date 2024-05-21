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
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../paginas/conta/conta/conta.module').then(
                (m) => m.ContaPageModule
              ),
          },
          {
            path: 'cadastro',
            loadChildren: () =>
              import('../paginas/conta/cadastro/cadastro.module').then(
                (m) => m.CadastroPageModule
              ),
          },
          {
            path: 'minhaconta',
            loadChildren: () =>
              import('../paginas/conta/minhaconta/minhaconta.module').then(
                (m) => m.MinhacontaPageModule
              ),
          },
        ],
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
