import { Component, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { ReviewService } from 'src/app/services/review.service';

@Component({
  selector: 'app-reviews',
  templateUrl: 'reviews.page.html',
  styleUrls: ['reviews.page.scss'],
})
export class ReviewsPage implements OnInit {
  avaliacoes: any[] = [];
  userInfo: any;
  isModalOpen = false;
  batchSize = 5; // Tamanho do lote
  currentBatch = 0; // Lote atual

  constructor(private reviewService: ReviewService) {}

  ngOnInit() {
    this.loadUserReviews();
  }

  async loadUserReviews() {
    try {
      this.userInfo = await this.reviewService.getUserReviews();
      this.loadMoreReviews();
    } catch (error) {
      console.error('Erro ao carregar informações do usuário:', error);
    }
  }

  loadMoreReviews() {
    const startIndex = this.currentBatch * this.batchSize;
    const endIndex = startIndex + this.batchSize;
    const moreReviews = this.userInfo.reviews.slice(startIndex, endIndex);
    this.avaliacoes.push(...moreReviews);
    this.currentBatch++;
  }

  onIonInfinite(ev: any) {
    this.loadMoreReviews();
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }
}
