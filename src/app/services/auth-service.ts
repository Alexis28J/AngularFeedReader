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

  auth = getAuth(this.firebaseServ.app);   // Ottieni l’istanza di Auth dal tuo FirebaseService, che a sua volta ha l’istanza dell’app Firebase.
  // getAuth: è una funzione di Firebase che ritorna l’istanza di Auth, usata per tutte le operazioni di autenticazione.

  isAuth = signal(false);

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

  loginWithMailAndPassword(email: string, password: string) {      //Se l’email e password sono corretti, Firebase risolve la Promise, altrimenti la rifiuta con un errore.
    return signInWithEmailAndPassword(this.auth, email, password);  // Ritorna una Promise, gestita nel componente di login.
  }

  registerWithEmailAndPassword        // Se l’email è già in uso, o la password è troppo debole, Firebase rifiuta la Promise con un errore.
    (email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password);  // Ritorna una Promise, gestita nel componente di registrazione.
    //createUserWithEmailAndPassword: è una funzione di Firebase che crea un nuovo utente con email e password.
    
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

