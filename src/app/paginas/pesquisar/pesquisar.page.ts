import { Component } from '@angular/core';
import { InfiniteScrollCustomEvent, NavController } from '@ionic/angular';
import { ApiIdService } from 'src/app/services/api-id.service';

@Component({
  selector: 'app-pesquisar',
  templateUrl: 'pesquisar.page.html',
  styleUrls: ['pesquisar.page.scss'],
})
export class PesquisarPage {
  constructor( public navCtrl: NavController,private apiserviceId : ApiIdService) { }

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

  onSearch(event: any) {
    const query = event.target.value.toLowerCase();

    console.log(query)
   
      this.apiserviceId.getDadosDaAPIId(query).subscribe(data => {
        this.navCtrl.navigateForward(`/tabs/filmes/filme/${data.name}`)
        console.log(data.name)
        // this.nomeFilme = data.name;
        // this.posterFilme = data.images[0].href;
      });
    ;
  }


}
