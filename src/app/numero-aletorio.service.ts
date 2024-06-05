import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NumeroAletorioService {

  constructor() { }

  gerarNumeroAleatorio(): number {
    return Math.floor(Math.random() * 1000) + 1;
  }
    
}
