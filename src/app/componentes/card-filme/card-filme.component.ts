import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-card-filme',
  templateUrl: './card-filme.component.html',
  styleUrls: ['./card-filme.component.scss'],
})
export class CardFilmeComponent implements OnInit {
  constructor(public navCtrl: NavController) {}

  ngOnInit() {}

  /* NAVEGA PARA: Filme */
  navToFilme() {
    this.navCtrl.navigateForward('/tabs/filmes/filme');
  }
}
