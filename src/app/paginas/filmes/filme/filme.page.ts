import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiIdService } from 'src/app/services/api-id.service';
import { InfiniteScrollCustomEvent, ToastController } from '@ionic/angular';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-filme',
  templateUrl: './filme.page.html',
  styleUrls: ['./filme.page.scss'],
})
export class FilmePage implements OnInit {
  idFilme: string;
  nomeFilme = '';
  posterFilme = '';
  yearMovie=''
  Rated=''
  Runtime=''
  Plot=''
  Metascore=''
  avaliacoes: any = [];
  isModalOpen = false;
  estrelas: number = 0;
  comentario: string = '';

  constructor(
    private route: ActivatedRoute,
    private apiserviceId: ApiIdService,
    private platform: Platform,
    private toastController: ToastController
  ) {
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

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.idFilme = params.get('id');
      this.apiserviceId.getDadosDaAPIId(this.idFilme).subscribe((data) => {
        this.nomeFilme = data.Title;
        this.posterFilme = data.Poster;
        this.yearMovie= data.Year
        this.Rated= data.Rated
        this.Runtime= data.Runtime
        this.Plot= data.Plot
        this.Metascore= data.Ratings[0].Value
      });
    });
    this.gerarAvaliacoes();
  }

  abreImagem() {
    let banner = document.querySelector('.banner');
    banner.classList.toggle('ativa');
  }

  private gerarAvaliacoes() {
    const count = this.avaliacoes.length + 1;
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

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  onEstrelasClick(estrelas: number) {
    this.estrelas = estrelas;
  }

  async enviarAvaliacao() {
    if (!this.comentario) {
      const toast = await this.toastController.create({
        message: 'Por favor, escreva um comentário.',
        duration: 2000,
        color: 'danger'
      });
      await toast.present();
      return;
    }

    try {
      await this.apiserviceId.addAvaliacao(this.idFilme, this.estrelas, this.comentario);
      const toast = await this.toastController.create({
        message: 'Avaliação enviada com sucesso!',
        duration: 2000,
        color: 'success'
      });
      await toast.present();
      this.setOpen(false);
      this.comentario = '';
      this.estrelas = 0;
    } catch (error) {
      const toast = await this.toastController.create({
        message: 'Erro ao enviar avaliação. Por favor, tente novamente.',
        duration: 2000,
        color: 'danger'
      });
      await toast.present();
      console.error('Erro ao enviar avaliação:', error);
    }
  }
}
