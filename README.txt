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

- Firebase docs 
  https://firebase.google.com/docs/auth/web/start?hl=it 
  https://firebase.google.com/docs/auth/web/password-auth?hl=it 
  (Creare un account basato su password - Accedere come utente con un indirizzo email e una password)

- Creiamo un servizio solo per l'autenticazione - ng g s /services/AuthService
- Su auth-service.ts, incolliamo il codice di "Impostare un osservatore dello stato di autenticazione e ottenere i dati utente"
- Su login-component.ts, incolliamo il codice di "Accedere come utente con un indirizzo email e una password"
- Modifiche in auth-service.ts, login-component.ts e login-component.html
- Tastino "logout" nell'Header: importare AuthService in header-component.ts e mettiamo un if in header-component.html
- Incollo codice "Passaggi successivi" nell'auth-service.ts
- Modifiche in header-component.ts e header-component.html
- Facciamo una guard per proteggere la home: ng g guard /guards/authGuard - Invia su "CanActivate"
- Abbiamo rinominato da auth-guard-guard a auth-guard
- Modifiche in app.routes.ts

TASK: IMPLEMENTARE LA REGISTRAZIONE

Creare un account basato su password

const auth = getAuth();
createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });

OPZIONALE: FARE UN VALIDATOR DELLA PASSWORD

- creiamo RegisterComponent
- ho aggiunto la route in app.routes.ts

- ALTRO TASK: https://angular.dev/guide/testing  
  FARE IL TUTORIAL - I PRIMI 4 STEP

