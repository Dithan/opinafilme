import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private afAuth: AngularFireAuth, private router: Router,private firestore: AngularFirestore,
  ) {}

  // Login com email e senha
  async login(email: string, password: string) {
    try {
      const userCredential = await this.afAuth.signInWithEmailAndPassword(email, password);
      return userCredential.user;
    } catch (error) {
      throw new Error('Falha na autenticação');
    }
  }


  // Registro com email e senha
  async register(email: string, password: string, fullName: string) {
    try {
      const userCredential = await this.afAuth.createUserWithEmailAndPassword(email, password);
      const user = userCredential.user;
      if (user) {
        await this.firestore.collection('users').doc(user.uid).set({
          email: email,
          fullName: fullName,
        });
      }
      this.router.navigate(['/conta']);
    } catch (error) {
      console.error('Erro no registro: ', error);
    }
  }



  // Função para obter as informações do usuário
  async getUserInfo() {
    const user = await this.afAuth.currentUser;
    if (user) {
      const userDoc = await this.firestore.collection('users').doc(user.uid).get().toPromise();
      return userDoc.data();
    } else {
      throw new Error('Usuário não autenticado');
    }
  }

  // Função para atualizar o nome, email e senha do usuário
  async updateUserInfo(fullName: string, email: string, password: string) {
    const user = await this.afAuth.currentUser;
    if (user) {
      // Atualizar nome no Firestore
      await this.firestore.collection('users').doc(user.uid).update({
        fullName: fullName,
      });

      // Atualizar email no Firebase Auth
      await user.updateEmail(email);
      // Atualizar senha no Firebase Auth
      await user.updatePassword(password);

      // Atualizar email no Firestore
      await this.firestore.collection('users').doc(user.uid).update({
        email: email,
      });
    } else {
      throw new Error('Usuário não autenticado');
    }
  }

  // Logout
  async logout() {
    try {
      await this.afAuth.signOut();
      this.router.navigate(['/tabs/filmes']);

    } catch (error) {
      console.error('Erro no logout: ', error);
    }
  }

  // Autenticação com Google
  async googleSignIn() {
    try {
      await this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
      this.router.navigate(['/filmes']);
    } catch (error) {
      console.error('Erro no login com Google: ', error);
    }
  }

  // Observador de autenticação
  getAuthState() {
    return this.afAuth.authState;
  }
}
