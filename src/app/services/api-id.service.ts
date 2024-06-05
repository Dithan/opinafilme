import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ApiIdService {

  constructor(private http: HttpClient) { }
 

  getDadosDaAPIId(idfilme : string): Observable<any> {
    return this.http.get(`https://digi-api.com/api/v1/digimon/${idfilme}`);
  }
}
