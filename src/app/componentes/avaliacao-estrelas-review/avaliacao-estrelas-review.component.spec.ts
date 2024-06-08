import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AvaliacaoEstrelasReviewComponent } from './avaliacao-estrelas-review.component';

describe('AvaliacaoEstrelasReviewComponent', () => {
  let component: AvaliacaoEstrelasReviewComponent;
  let fixture: ComponentFixture<AvaliacaoEstrelasReviewComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AvaliacaoEstrelasReviewComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AvaliacaoEstrelasReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
