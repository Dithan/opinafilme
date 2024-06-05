import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-card-filme-pesquisa',
  templateUrl: './card-filme-pesquisa.component.html',
  styleUrls: ['./card-filme-pesquisa.component.scss'],
})
export class CardFilmePesquisaComponent  implements OnInit {
  constructor(public navCtrl: NavController, private apiService: ApiService) {}

  nomeFilme :string;
  posterFilme :string;
  idFilme :string
  bioFilme :string
  ngOnInit(): void {
    this.apiService.getDadosDaAPI().subscribe((data) => {
      this.idFilme = data.id;
      this.bioFilme = data.descriptions[1].description;

      this.nomeFilme = data.name;

      this.posterFilme = data.images[0].href;
    });
  }

  /* NAVEGA PARA: Filme */
  navToFilme(itemId: string) {
    this.navCtrl.navigateForward(`/tabs/filmes/filme/${itemId}`);
  }

}
