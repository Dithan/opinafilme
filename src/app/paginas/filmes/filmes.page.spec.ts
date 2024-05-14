import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ExploreContainerComponentModule } from '../../explore-container/explore-container.module';

import { FilmesPage } from './filmes.page';

describe('FilmesPage', () => {
  let component: FilmesPage;
  let fixture: ComponentFixture<FilmesPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FilmesPage],
      imports: [IonicModule.forRoot(), ExploreContainerComponentModule],
    }).compileComponents();

    fixture = TestBed.createComponent(FilmesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
