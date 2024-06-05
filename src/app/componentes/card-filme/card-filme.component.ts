import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-card-filme',
  templateUrl: './card-filme.component.html',
  styleUrls: ['./card-filme.component.scss'],
})
export class CardFilmeComponent implements OnInit {
  constructor(public navCtrl: NavController, private apiService: ApiService) {}
  nomeFilme = '';
  posterFilme = '';
  idFilme = ''
  ngOnInit(): void {
    this.apiService.getDadosDaAPI().subscribe((data) => {
      this.idFilme = data.id;

      this.nomeFilme = data.name;

      this.posterFilme = data.images[0].href;
    });
  }

  /* NAVEGA PARA: Filme */
  navToFilme() {
    this.navCtrl.navigateForward('/tabs/filmes/filme');
  }
}
