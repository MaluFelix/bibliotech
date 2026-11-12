
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { take } from 'rxjs/operators';

@Injectable()
export class UserService {

  constructor(
    public db: AngularFirestore,
    public afAuth: AngularFireAuth
  ) {}

  getCurrentUser() {
    return this.afAuth.authState
      .pipe(take(1))
      .toPromise()
      .then(user => {
        if (user) {
          return user;
        }

        return Promise.reject('No user logged in');
      });
  }

  updateCurrentUser(value: { name: string, photoURL: string}) {
    return this.getCurrentUser().then(user => {
      return user.updateProfile({
        displayName: value.name,
        photoURL: user.photoURL
      });
    });
  }
}
