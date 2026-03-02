import { inject, Injectable, signal } from '@angular/core';
import { FirebaseService } from './firebase-service';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  //   // An error happened.
  // });

  firebaseServ = inject(FirebaseService);

  auth = getAuth(this.firebaseServ.app);   // *1

  isAuth = signal(false);  //*2

  constructor() {

    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        // const uid = user.uid;
        // console.log('Viva siamo loggati', user);
        this.isAuth.set(true);
      } else {
        //console.log(' Dannazione non siamo più loggati');
        this.isAuth.set(false);
      }
    });
  }

  //     loginWithMailAndPassword(email: string, password: string) {
  //     signInWithEmailAndPassword(this.auth, email, password)
  //     .then((userCredential) => {
  //     // Signed in 
  //     const user = userCredential.user;
  //     // ...
  //   })
  //     .catch((error) => {
  //     const errorCode = error.code;
  //     const errorMessage = error.message;
  //     console.log(errorMessage);

  //   });
  //   }

  loginWithMailAndPassword(email: string, password: string) {      //*3
    return signInWithEmailAndPassword(this.auth, email, password);  
  }

  registerWithEmailAndPassword        //*4
    (email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password);  
  }

  logout() {
    //     signOut(this.auth).then(() => {
    //   // Sign-out successful.
    // }).catch((error) => {
    //   // An error happened.
    // });
    return signOut(this.auth);
  }
}

