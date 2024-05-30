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

  private geraFilmes() {
    const count = this.filmes.length + 1;
    for (let i = 0; i < 12; i++) {
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
