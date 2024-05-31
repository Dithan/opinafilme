import { Component } from '@angular/core';
import { InfiniteScrollCustomEvent } from '@ionic/angular';

@Component({
  selector: 'app-pesquisar',
  templateUrl: 'pesquisar.page.html',
  styleUrls: ['pesquisar.page.scss'],
})
export class PesquisarPage {
  filmes: any = [];

  ngOnInit() {
    this.geraFilmes();
  }

  /* Carrega 5 filmes por vez, quando scroll, carrega mais 5 (alterar no for) */
  private geraFilmes() {
    const count = this.filmes.length + 1;
    // Alterar offset aqui (i < 5)
    for (let i = 0; i < 5; i++) {
      this.filmes.push(`Item ${count + i}`);
    }
  }

  onIonInfinite(ev: any) {
    this.geraFilmes();
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }
}
