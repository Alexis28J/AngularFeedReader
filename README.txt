Lezione di giovedì 26 febbraio 2026:
Firebase di Google  https://firebase.google.com/:  
Firebase è una piattaforma di sviluppo Backend-as-a-Service (BaaS) di Google che permette di creare rapidamente applicazioni web e mobile di alta qualità. Offre strumenti integrati per la gestione del database (NoSQL), autenticazione utenti, hosting, Cloud Functions e analisi, eliminando la necessità di gestire server complessi. 

Alternative:
https://supabase.com/
https://pocketbase.io/
https://vercel.com/
https://www.netcup.com/en


Creazione mini-app su Firebase

- Su Firebase di Google, loggarsi con l'account e andare su "Go to console".
- Abbiamo creato un nuovo progetto "feed-reader" (aggregatore di notizie).
  Nota: Per questo progettino abbiamo disabilitato l'AI di Gemini.

- Feed Rss di "Il Secolo"  https://www.ilsecoloxix.it/utility/2000/05/13/news/feed_rss-9610404/
- Aggiungiamo un'app di tipo "web" - opzione si trova sotto "feed-reader Piano Spark"
- nickname app "feed-reader-web"
- Nuovo progetto Angular su Visual code: ng new AngularFeedReader --directory ./ --skip-tests
  (--skip-tests per non creare i file di test)

- Seguiamo le istruzione di Firebase: eseguo il comando "npm install firebase"

- ng g s /services/FirebaseService - per creare il servizio Firebase

- Instruzioni Firebase: (su firebase-service.ts)

import { initializeApp } from "firebase/app"; 

const firebaseConfig = {

  apiKey: "AIzaSyCTLd1TZjSo5FCifm2GFJU-XTQvp1Xi6zA",

  authDomain: "feed-reader-14409.firebaseapp.com",

  projectId: "feed-reader-14409",

  storageBucket: "feed-reader-14409.firebasestorage.app",

  messagingSenderId: "945417544215",

  appId: "1:945417544215:web:06c14ebcfeb6006bde3252"

};

const app = initializeApp(firebaseConfig);


- Su app.ts, iniettiamo il servizio 

- Su firebase, cliccare "Vai alla console" per tornare alla home del progetto 

- Poi andare, sul toolbar laterale, su Creazione, poi Authentication - Anonimo , email 

- Poi andare, sul toolbar laterale, su Creazione, poi su Firebase database
  Consiglio: usare server europeo 

- https://firebase.google.com/docs/auth/web/password-auth?hl=it - Firebase docs 
(Eseguire l'autenticazione con Firebase utilizzando account basati su password con JavaScript)

- ng g c /components/loginComponent
- ng g c /components/homeComponent
- ng g c /components/headerComponent

- Creiamo il routing su app.routes.ts

- Modifiche su app.html

- Modifiche su header-component.html

- Modifiche su login-component.html
  La differenza tra una Reactive Form e un ngModel è che la Reactive Form è più adatta per form complesse e dinamiche,
  mentre ngModel è più semplice e adatto per form statiche. La Reactive Form offre un maggiore controllo sulla validazione e sulla gestione dello stato del form, mentre ngModel è più facile da implementare per form semplici.

- Su Authentication, aggiungiamo un utente "pippo@topolino.to" con la password "superpippo"

- Modifiche su login-component.ts


   