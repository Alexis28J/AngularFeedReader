import { inject, Injectable, signal } from '@angular/core';
import { FirebaseService } from './firebase-service';
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { log } from 'firebase/firestore/pipelines';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  firebaseServ = inject(FirebaseService);

  auth = getAuth(this.firebaseServ.app);
  
  isAuth = signal(false);

  constructor(){

    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        // const uid = user.uid;
        // console.log('Viva siamo loggati', user);
        this.isAuth.set(true);
      }else{
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

    loginWithMailAndPassword(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  logout(){
//     signOut(this.auth).then(() => {
//   // Sign-out successful.
// }).catch((error) => {
//   // An error happened.
// });
   return signOut(this.auth);
  }
}

