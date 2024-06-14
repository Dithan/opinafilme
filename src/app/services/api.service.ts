import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NumeroAletorioService } from './numero-aletorio.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient,private numRandom :NumeroAletorioService,private nameRandom :NumeroAletorioService) { }
 

  getDadosDaAPI(): Observable<any> {
    return this.http.get(`https://www.omdbapi.com/?apikey=${environment.apikey}&s=${this.nameRandom.gerarPalavraAleatoria()}&page=${this.numRandom.gerarNumeroAleatorio()}&type=movie`);
  }
}
