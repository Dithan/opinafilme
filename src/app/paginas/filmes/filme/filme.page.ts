import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiIdService } from 'src/app/services/api-id.service';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-filme',
  templateUrl: './filme.page.html',
  styleUrls: ['./filme.page.scss'],
})
export class FilmePage implements OnInit {
  // API
  idFilme: string;
  nomeFilme = '';
  posterFilme = '';

  // Scroll Infinito
  avaliacoes: any = [];

  constructor(
    private route: ActivatedRoute,
    private apiserviceId: ApiIdService,
    private platform: Platform
  ) {
    // MODAL AVALIAÇÃO
    this.platform.keyboardDidShow.subscribe(() => {
      const modalElement = document.querySelector('ion-modal');
      if (modalElement) {
        modalElement.classList.add('modal-with-keyboard');
      }
    });

    this.platform.keyboardDidHide.subscribe(() => {
      const modalElement = document.querySelector('ion-modal');
      if (modalElement) {
        modalElement.classList.remove('modal-with-keyboard');
      }
    });
  }

  // API
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.idFilme = params.get('id');
      this.apiserviceId.getDadosDaAPIId(this.idFilme).subscribe((data) => {
        this.nomeFilme = data.name;
        this.posterFilme = data.images[0].href;
      });
    });

    this.gerarAvaliacoes();
  }

  abreImagem() {
    let banner = document.querySelector('.banner');

    banner.classList.toggle('ativa');
  }

  //Scroll Infinito
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

  // MODAL
  isModalOpen = false;

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }
}
