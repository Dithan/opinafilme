import { Component } from '@angular/core';
import { InfiniteScrollCustomEvent, NavController } from '@ionic/angular';
import { ApiIdService } from 'src/app/services/api-id.service';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-pesquisar',
  templateUrl: 'pesquisar.page.html',
  styleUrls: ['pesquisar.page.scss'],
})
export class PesquisarPage {
  private searchSubject = new Subject<string>();
  query: string = '';
  filmes: any[] = [];
  results: any[] = [];

  constructor(public navCtrl: NavController, private apiserviceId: ApiIdService) { }

  ngOnInit() {
    this.geraFilmes();

    this.searchSubject.pipe(
      debounceTime(1000),
      distinctUntilChanged(),
      switchMap(query => this.apiserviceId.getDadosDaAPIName(query))
    ).subscribe(
      data => {
        if (data.Search) {
          this.results = data.Search;
        } else {
          this.results = [];
        }
      },
      error => {
        console.error('Erro ao buscar dados da API', error);
        this.results = [];
      }
    );
  }

  private geraFilmes() {
    const count = this.filmes.length + 1;
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

  handleInput(event: any) {
    const query = event.target.value.toLowerCase();
    this.searchSubject.next(query);
  }

  handleKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.onSearch();
    }
  }

  onSearch() {
    const query = this.query.toLowerCase().trim();
    if (query) {
      this.apiserviceId.getDadosDaAPIName(query).subscribe(
        data => {
          if (data.Search) {
            this.results = data.Search;
          } else {
            this.results = [];
          }
        },
        error => {
          console.error('Erro ao buscar dados da API', error);
          this.results = [];
        }
      );
    }
  }

  onMovieClick(title: string, imdbID: string) {
    console.log(`Title: ${title}, IMDb ID: ${imdbID}`);
    // Faça algo com o título e imdbID, por exemplo, navegar para outra página:
    this.navCtrl.navigateForward(`/tabs/filmes/filme/${imdbID}`);
  }
}
