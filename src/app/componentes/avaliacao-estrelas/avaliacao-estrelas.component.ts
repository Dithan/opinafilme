import { Component, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-avaliacao-estrelas',
  templateUrl: './avaliacao-estrelas.component.html',
  styleUrls: ['./avaliacao-estrelas.component.scss'],
})
export class AvaliacaoEstrelasComponent implements AfterViewInit {
  @Input() numStars: number = 5;
  @Input() value: number = 2.5;
  @Input() leitura: boolean = false;

  @Output() ionClick: EventEmitter<number> = new EventEmitter<number>();

  stars: string[] = [];

  constructor() {}

  ngAfterViewInit() {
    this.calc();
  }

  calc() {
    this.stars = [];
    let tmp = this.value;
    for (let i = 0; i < this.numStars; i++, tmp--) {
      if (tmp >= 1) {
        this.stars.push('star');
      } else if (tmp > 0 && tmp < 1) {
        this.stars.push('star-half');
      } else {
        this.stars.push('star-outline');
      }
    }
  }

  starClicked(index: number) {
    if (!this.leitura) {
      this.value = index + 1;
      this.ionClick.emit(this.value);
      this.calc();
      console.log(this.value); // AQUI ESTÁ O VALOR DA NOTA DADA PELO USUÁRIO = this.value
    }
  }
}
