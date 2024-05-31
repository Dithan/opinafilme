import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CardFilmePesquisaComponent } from './card-filme-pesquisa.component';

describe('CardFilmePesquisaComponent', () => {
  let component: CardFilmePesquisaComponent;
  let fixture: ComponentFixture<CardFilmePesquisaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CardFilmePesquisaComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CardFilmePesquisaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
