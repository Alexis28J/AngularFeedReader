import { Injectable } from '@angular/core';
import { FirebaseApp, initializeApp } from "firebase/app";


@Injectable({
  providedIn: 'root',
  
})
export class FirebaseService {

  firebaseConfig = {   //Queste key non dovrebbero essere qui per sicurezza
  apiKey: "AIzaSyCTLd1TZjSo5FCifm2GFJU-XTQvp1Xi6zA",
  authDomain: "feed-reader-14409.firebaseapp.com",
  projectId: "feed-reader-14409",
  storageBucket: "feed-reader-14409.firebasestorage.app",
  messagingSenderId: "945417544215",
  appId: "1:945417544215:web:06c14ebcfeb6006bde3252"
};

app: FirebaseApp;

constructor(){
  this.app = initializeApp(this.firebaseConfig);
}

}
