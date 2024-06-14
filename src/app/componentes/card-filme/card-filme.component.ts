import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-card-filme',
  templateUrl: './card-filme.component.html',
  styleUrls: ['./card-filme.component.scss'],
})
export class CardFilmeComponent implements OnInit {
  constructor(public navCtrl: NavController, private apiService: ApiService) {}
  nomeFilme = '';
  posterFilme : any;
  idFilme = ''
  yearMovie = ''
  ngOnInit(): void {
    this.apiService.getDadosDaAPI().subscribe((data) => {
      this.idFilme = data.Search[0].imdbID;

      this.nomeFilme = data.Search[0].Title;

      this.posterFilme = data.Search[0].Poster;

      this.yearMovie = data.Search[0].Year
      
      if(this.posterFilme == "N/A"){
        this.posterFilme = false
      }
    });
  }

  /* NAVEGA PARA: Filme */
  navToFilme(itemId: string) {
    this.navCtrl.navigateForward(`/tabs/filmes/filme/${itemId}`);
  }
}
