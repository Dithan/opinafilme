import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { environment } from '../../environments/environment';

interface Avaliacao {
  id: string;
  estrelas: number;
  comentario: string;
  timestamp: Date;
}

interface Usuario {
  reviews: Avaliacao[];
}
@Injectable({
  providedIn: 'root'
})
export class ApiIdService {

  constructor(private http: HttpClient,private firestore: AngularFirestore,
    private afAuth: AngularFireAuth) { }
 

  getDadosDaAPIId(idfilme : string): Observable<any> {
    return this.http.get(`https://www.omdbapi.com/?apikey=${environment.apikey}&i=${idfilme}`);
  }
  getDadosDaAPIName(namefilme : string): Observable<any> {
    return this.http.get(`https://www.omdbapi.com/?apikey=${environment.apikey}&s=${namefilme}`);
  }
  
  async addAvaliacao(filmeId: string, estrelas: number, comentario: string) {
    const user = await this.afAuth.currentUser;
    if (!user) {
      throw new Error('Usuário não autenticado');
    }

    const avaliacao: Avaliacao = {
      id: filmeId,
      estrelas: estrelas,
      comentario: comentario,
      timestamp: new Date()
    };

    const userDocRef = this.firestore.collection<Usuario>('users').doc(user.uid);

    return this.firestore.firestore.runTransaction(async (transaction) => {
      const userDoc = await transaction.get(userDocRef.ref);
      if (!userDoc.exists) {
        throw new Error('Usuário não encontrado');
      }

      const userData = userDoc.data() as Usuario;
      const reviews = userData.reviews || [];
      reviews.push(avaliacao);

      transaction.update(userDocRef.ref, { reviews: reviews });
    });
  }
  
}
