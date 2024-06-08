import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReviewsPage } from './reviews.page';
import { ExploreContainerComponentModule } from '../../explore-container/explore-container.module';

import { ReviewsPageRoutingModule } from './reviews-routing.module';
import { CardAvaliacaoReviewComponent } from 'src/app/componentes/card-avaliacao-review/card-avaliacao-review.component';
import { AvaliacaoEstrelasReviewComponent } from 'src/app/componentes/avaliacao-estrelas-review/avaliacao-estrelas-review.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    ReviewsPageRoutingModule,
  ],
  declarations: [
    ReviewsPage,
    CardAvaliacaoReviewComponent,
    AvaliacaoEstrelasReviewComponent,
  ],
})
export class ReviewsPageModule {}
