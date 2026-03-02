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

  apiKey: "........"

  authDomain: "......",

  projectId: "feed-reader-....",

  storageBucket: "feed-reader-14409.....",

  messagingSenderId: "94541......",

  appId: "....."

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
https://firebase.google.com/docs/auth/web/password-auth?hl=it

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


-------------------------------------------------------------------------------------------------------------------------------------------------

Lezione Lunedì 2 marzo 2026:

Abbiamo aggiunto un po' di css per rendere più leggibile (presentabile) l'app.

ng g c /components/newFeed  ---  componente newFeedComponent

Aggiungo link a header-component.html.

Per fare la form di new-feed useremo le "Reactive Form" (vedi new-feed-component.ts e new-feed-component.html)

Vado su Firebase Database in Firebase. E' un database standard cioè non SQL.
Abbiamo creato una raccolta di feed. Ho incollato (inserito) il link RSS di Ansa (https://www.ansa.it/sito/ansait_rss.xml).
NOTA: ho cliccato su ID automatico per generare un ID documento (perché questo campo è obbligatorio)

ng g s /services/firestoreService  - servizio per interagire con il database Firestore di Firebase.

Ho iniettato il servizio di Firestore su new-feed-component.ts e ho messo la logica di onSubmit() (vedi anche firestore-service.ts).
-->  ng g i /model/feed  - creo un'interfaccia per rappresentare un feed (feed.model.ts) 

Su firestore-service.ts, ho aggiunto un metodo addFeed() che aggiunge un nuovo feed all'array userFeeds. In un'applicazione reale, questa logica dovrebbe essere sostituita con una chiamata a un database o a un servizio di backend per salvare i dati in modo persistente.
https://firebase.google.com/docs/firestore/manage-data/add-data  (Mobile and web SDKs  /  Set a document)

Su new-feed-component.ts, ho modificato onSubmit() per creare un nuovo feed a partire dai dati del form e poi chiamare firestore.addFeed(newFeed) per aggiungere il feed al database.

ng g s /services/rssService - servizio per interagire con i feed RSS. In questo servizio, potremmo implementare la logica per recuperare e analizzare i feed RSS, ma per ora lo lasciamo vuoto.

Su home-component.ts, ho aggiunto un effetto che chiama rssServ.news() ogni volta che il componente viene renderizzato. Questo effetto è utile per recuperare i feed RSS e aggiornare la visualizzazione ogni volta che il componente viene caricato o quando i dati dei feed cambiano.

Su rss-service.ts, ho aggiunto un metodo news() che attualmente restituisce un array di feed statico. In un'applicazione reale, questo metodo dovrebbe essere implementato per recuperare i feed RSS da una fonte esterna, come un'API o un database.

Su firestore-service.ts, ho aggiunto un metodo getUserFeeds() che restituisce l'array userFeeds. In un'applicazione reale, questo metodo dovrebbe essere implementato per recuperare i feed dell'utente da un database o da un servizio di backend.

Di nuovo su rss-service.ts, ho modificato il metodo news() per restituire i feed dell'utente recuperati da firestore.getUserFeeds(). In questo modo, quando chiamiamo rssServ.news() in home-component.ts, otterremo i feed dell'utente invece di un array statico.

Nota: CORS è un meccanismo di sicurezza implementato nei browser web che consente o blocca le richieste HTTP tra domini diversi. Se stai cercando di recuperare dati da un dominio diverso da quello del tuo sito web, potresti incontrare problemi di CORS. 
Per risolvere questo problema, puoi utilizzare un proxy server o configurare il server di destinazione per consentire le richieste CORS.

ng g i /model/news  -  creo un'interfaccia per rappresentare una notizia (news.model.ts)

TASK: aggiungere pubDate e mettere un ordine per data 