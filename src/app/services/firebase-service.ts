import { Injectable } from '@angular/core';
import { FirebaseApp, initializeApp } from "firebase/app";
import { environment } from '../../environments/environment.development';


@Injectable({
  providedIn: 'root',
  
})
export class FirebaseService { //*1
//   firebaseConfig = {   
//   apiKey: "...",
//   authDomain: "...",
//   projectId: "...",
//   storageBucket: "...",
//   messagingSenderId: "...",
//   appId: "..."
// };

app: FirebaseApp;  //*2

constructor(){
  //this.app = initializeApp(this.firebaseConfig);
  this.app = initializeApp(environment.firebaseConfig);
}

}

//Il constructor serve per inizializzare l'app Firebase con la configurazione fornita. In questo modo, quando il servizio viene creato, l'app Firebase è già pronta per essere utilizzata.