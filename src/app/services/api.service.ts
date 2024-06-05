import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NumeroAletorioService } from './numero-aletorio.service';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient,private numRandom :NumeroAletorioService) { }
 

  getDadosDaAPI(): Observable<any> {
    return this.http.get(`https://digi-api.com/api/v1/digimon/${this.numRandom.gerarNumeroAleatorio()}`);
  }
}
