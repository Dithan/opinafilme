import { Component, Input, OnInit } from '@angular/core';
import { ApiIdService } from 'src/app/services/api-id.service';
import { ReviewService } from 'src/app/services/review.service';

@Component({
  selector: 'app-card-avaliacao-review',
  templateUrl: './card-avaliacao-review.component.html',
  styleUrls: ['./card-avaliacao-review.component.scss'],
})
export class CardAvaliacaoReviewComponent implements OnInit {
  @Input() review: any;
  nomeFilme = '';

  constructor(private apiServiceId: ApiIdService) {}

  ngOnInit() {
    this.loadMovieName();
  }

  loadMovieName() {
    if (this.review && this.review.id) {
      this.apiServiceId.getDadosDaAPIId(this.review.id).subscribe((data) => {
        this.nomeFilme = data.Title; // Atualiza o nome do filme com o dado obtido da API
      });
    }
  }
}
