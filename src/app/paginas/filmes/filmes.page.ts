import { Component } from '@angular/core';
import { InfiniteScrollCustomEvent } from '@ionic/angular';

@Component({
  selector: 'app-filmes',
  templateUrl: 'filmes.page.html',
  styleUrls: ['filmes.page.scss'],
})
export class FilmesPage {
  filmes: any = [];

  ngOnInit() {
    this.geraFilmes();
  }

  /* Carrega 10 filmes por vez, quando scroll, carrega mais 10 (alterar no for) */
  private geraFilmes() {
    const count = this.filmes.length + 1;
    // Alterar offset aqui (i < 12)
    for (let i = 0; i < 10; i++) {
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
