import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private afAuth: AngularFireAuth, private router: Router) {}

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
  async register(email: string, password: string) {
    try {
      await this.afAuth.createUserWithEmailAndPassword(email, password);
      this.router.navigate(['/conta']);
    } catch (error) {
      console.error('Erro no registro: ', error);
    }
  }

  // Logout
  async logout() {
    try {
      await this.afAuth.signOut();
      this.router.navigate(['/login']);
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
