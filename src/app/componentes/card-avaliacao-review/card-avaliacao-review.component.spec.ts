import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CardAvaliacaoReviewComponent } from './card-avaliacao-review.component';

describe('CardAvaliacaoReviewComponent', () => {
  let component: CardAvaliacaoReviewComponent;
  let fixture: ComponentFixture<CardAvaliacaoReviewComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CardAvaliacaoReviewComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CardAvaliacaoReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
