import { inject, Injectable } from '@angular/core';
import { Feed } from '../model/feed';
import { FirebaseService } from './firebase-service';
import { doc, getDoc, getFirestore, setDoc } from 'firebase/firestore';
import { AuthService } from './auth-service';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {

  firebase = inject(FirebaseService);
  authserv = inject(AuthService);

  //getFirestore è una funzione che restituisce un'istanza del database Firestore associato all'app Firebase specificata. 
  //In questo caso, viene passato this.firebase.app, che è l'istanza dell'app Firebase creata nel servizio FirebaseService.
  db = getFirestore(this.firebase.app);  

  //userFeeds è un array di oggetti di tipo Feed che rappresenta i feed dell'utente. In questo esempio, viene utilizzato come una semplice struttura dati in memoria per memorizzare i feed aggiunti dall'utente. 
  //In un'applicazione reale, questa logica dovrebbe essere sostituita con una chiamata a un database o a un servizio di backend per salvare i dati in modo persistente.
  userFeeds: Feed[] = [];  

  addFeed(newFeed: Feed) {

    //se l'utente è autenticato, allora procedi ad aggiungere il feed. Altrimenti, non fare nulla o gestire il caso in cui l'utente non è autenticato.
    if (this.authserv.auth.currentUser) {  

    //Aggiunge un nuovo feed all'array userFeeds. 
    //In un'applicazione reale, questa logica dovrebbe essere sostituita con una chiamata a un database o a un servizio di backend per salvare i dati in modo persistente.
    this.userFeeds.push(newFeed);  

    //userRef è una variabile che contiene un riferimento a un documento specifico all'interno della collezione 'users' del database Firestore. 
    //Il riferimento viene creato utilizzando la funzione doc, che prende come argomenti il database (this.db), il nome della collezione ('users') e l'ID dell'utente attualmente autenticato (this.authserv.auth.currentUser.uid).
    //In parole semplici, userRef rappresenta un documento specifico all'interno della collezione 'users' che corrisponde all'utente attualmente autenticato.
    const userRef = doc(this.db, 'users', this.authserv.auth.currentUser.uid);

    //setDoc è una funzione che consente di scrivere dati in un documento specifico all'interno di Firestore.
    //In questo caso, setDoc viene utilizzato per aggiornare il documento a cui userRef fa riferimento, impostando il campo 'feeds' con il valore di this.userFeeds. 
    //L'opzione {merge: true} indica che i dati esistenti nel documento non devono essere sovrascritti, ma piuttosto uniti con i nuovi dati forniti.
    //setDoc è asincrona come tutte le operazioni online. setDoc ritorna una Promise che si risolve quando l'operazione di scrittura è completata con successo o si rifiuta se si verifica un errore durante la scrittura.
    return setDoc(userRef, { feeds: this.userFeeds }, { merge: true });
    }
    
    //Se l'utente non è autenticato, viene restituita una Promise rifiutata con un messaggio di errore.
    return Promise.reject('User not authenticated');

  }

  getUserFeeds() {  //deve leggere i dati
   if (this.authserv.auth.currentUser) {  //se c'è il current user
    const userRef = doc(this.db, 'users', this.authserv.auth.currentUser.uid);
    return getDoc(userRef).then(result => 
      { 
        //console.log(result.data());
        this.userFeeds = result.data()!['feeds'];
        //console.log(this.userFeeds);
        return this.userFeeds;
      });
   }
     return Promise.reject('User not authenticated');
  }
}
