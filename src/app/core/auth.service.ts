
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

interface AngularFireAuthCompat extends AngularFireAuth {
  signInWithPopup(provider: firebase.auth.AuthProvider): Promise<firebase.auth.UserCredential>;
  createUserWithEmailAndPassword(email: string, password: string): Promise<firebase.auth.UserCredential>;
  signInWithEmailAndPassword(email: string, password: string): Promise<firebase.auth.UserCredential>;
  signOut(): Promise<void>;
  currentUser: Promise<firebase.User | null>;
}

@Injectable()
export class AuthService {

private auth: AngularFireAuthCompat;

  constructor(
    public afAuth: AngularFireAuth
  ) {
      this.auth = afAuth as AngularFireAuthCompat;
    }

  doFacebookLogin() {
    const provider = new firebase.auth.FacebookAuthProvider();
    return this.auth.signInWithPopup(provider);
  }

  doTwitterLogin() {
    const provider = new firebase.auth.TwitterAuthProvider();
    return this.auth.signInWithPopup(provider);
  }

  doGoogleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');

    return this.auth.signInWithPopup(provider);
  }

  doRegister(value: { email: string; password: string }) {
    return this.auth.createUserWithEmailAndPassword(
      value.email,
      value.password
    );
  }

  doLogin(value: { email: string; password: string }) {
    return this.auth.signInWithEmailAndPassword(
      value.email,
      value.password
    );
  }

  doLogout() {
    return this.auth.signOut();
  }
}
