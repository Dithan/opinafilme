import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NumeroAletorioService {

  constructor() { }

  gerarNumeroAleatorio(): number {
    return Math.floor(Math.random() * 100) + 1;
  }
    
   gerarPalavraAleatoria(): string {
    const palavras = ['spider', 'hero', 'born', 'final', 'summer'];
    const indiceAleatorio = Math.floor(Math.random() * palavras.length);
    return palavras[indiceAleatorio];
}
}
