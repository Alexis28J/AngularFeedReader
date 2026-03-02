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

  db = getFirestore(this.firebase.app);  //*1

  userFeeds: Feed[] = [];  //*2

  addFeed(newFeed: Feed) {  //* 3

    if (this.authserv.auth.currentUser) {  
    this.userFeeds.push(newFeed);  
    const userRef = doc(this.db, 'users', this.authserv.auth.currentUser.uid);
    return setDoc(userRef, { feeds: this.userFeeds }, { merge: true });
    
    }

    return Promise.reject('User not authenticated');  //*4

  }

  getUserFeeds() {  //deve leggere i dati
   if (this.authserv.auth.currentUser) {  //se c'è il current user
    const userRef = doc(this.db, 'users', this.authserv.auth.currentUser.uid);
    return getDoc(userRef).then(result => { 
        //console.log(result.data());
        this.userFeeds = result.data()!['feeds'];
        //console.log(this.userFeeds);
        return this.userFeeds;
      });
   }
     return Promise.reject('User not authenticated');
  }
}

