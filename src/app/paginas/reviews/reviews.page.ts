import { Component } from '@angular/core';
import { InfiniteScrollCustomEvent } from '@ionic/angular';

@Component({
  selector: 'app-reviews',
  templateUrl: 'reviews.page.html',
  styleUrls: ['reviews.page.scss'],
})
export class ReviewsPage {
  avaliacoes: any = [];

  ngOnInit() {
    this.gerarAvaliacoes();
  }

  /* Carrega 5 avaliacoes por vez, quando scroll, carrega mais 5 (alterar no for) */
  private gerarAvaliacoes() {
    const count = this.avaliacoes.length + 1;
    // Alterar offset aqui (i < 5)
    for (let i = 0; i < 5; i++) {
      this.avaliacoes.push(`Item ${count + i}`);
    }
  }

  onIonInfinite(ev: any) {
    this.gerarAvaliacoes();
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }
}
