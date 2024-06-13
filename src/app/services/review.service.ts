import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from './auth.service';
import { switchMap, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';


@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  constructor(private firestore: AngularFirestore, private afAuth: AngularFireAuth) {}

  async getUserReviews() {
    const user = await this.afAuth.currentUser;
    if (user) {
      const userDoc = await this.firestore.collection('users').doc(user.uid).get().toPromise();
      return userDoc.data();  // Retorna os dados do usuário
    } else {
      throw new Error('Usuário não autenticado');
    }
  }
}
