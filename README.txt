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

Per eliminare il problema di CORS, possiamo utilizzare Firebase Hosting per ospitare la nostra applicazione Angular. Firebase Hosting consente di servire i file statici della nostra applicazione e gestisce automaticamente le richieste CORS, consentendo al nostro frontend di comunicare con il backend senza problemi di sicurezza.
Per distribuire l'applicazione su Firebase Hosting, segui questi passaggi: 
1. Assicurati di avere Firebase CLI installato. Se non lo hai, puoi installarlo globalmente usando npm:
   npm install -g firebase-tools
2. Accedi al tuo account Firebase:
   firebase login
3. Inizializza il progetto Firebase nella directory del tuo progetto Angular:
   firebase init
    Durante l'inizializzazione, seleziona "Hosting" e scegli la directory di output della build (di solito dist/).
4. Compila l'applicazione Angular per la produzione:
   ng build --prod
5. Distribuisci l'applicazione su Firebase Hosting:
   firebase deploy


ng g i /model/news  -  creo un'interfaccia per rappresentare una notizia (news.model.ts)

TASK: aggiungere pubDate e mettere un ordine per data 

-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Lezione di martedì 3 marzo 2026:

https://www.rssboard.org/rss-specification#google_vignete  (Specifica RSS di Google)

lazy loading è una tecnica di ottimizzazione delle prestazioni che consiste nel caricare risorse o componenti solo quando sono effettivamente necessari, invece di caricarli tutti all'avvio dell'applicazione. 
In Angular, il lazy loading viene spesso utilizzato per caricare moduli in modo asincrono, migliorando così i tempi di caricamento iniziali e l'efficienza dell'applicazione.
https://angular.dev/reference/migrations/route-lazy-loading  (Angular 21 - Route lazy loading)

ng build serve per compilare l'applicazione Angular in un formato ottimizzato per la produzione. Questo comando esegue una serie di operazioni, tra cui la minificazione del codice, l'ottimizzazione delle risorse e la generazione di file statici che possono essere distribuiti su un server web.
Dopo aver eseguito ng build, i file compilati si trovano nella cartella dist/ del progetto. Questi file possono essere distribuiti su un server web o su una piattaforma di hosting come Firebase Hosting, Vercel, Netcup, ecc.
ng build si usa quando si è pronti a distribuire l'applicazione in produzione, mentre ng serve è più adatto per lo sviluppo locale, poiché consente di vedere le modifiche in tempo reale senza dover ricompilare manualmente ogni volta.

Il main shrinking è una tecnica di ottimizzazione delle prestazioni che consiste nel ridurre le dimensioni del file principale (main.js) generato durante la compilazione dell'applicazione Angular. Questo processo include la rimozione del codice inutilizzato, la minificazione e l'ottimizzazione del codice per migliorare i tempi di caricamento e le prestazioni dell'applicazione.
https://angular.io/guide/build#main-shrinking  (Main shrinking)


Stack overflow è una piattaforma online di domande e risposte per programmatori e sviluppatori. È un luogo dove gli utenti possono porre domande su problemi di programmazione, condividere conoscenze e soluzioni, e collaborare con altri membri della comunità. Stack overflow è una risorsa preziosa per trovare soluzioni a problemi di programmazione comuni, ottenere consigli su best practice e imparare nuove tecnologie.
https://stackoverflow.com/  (Stack overflow)

feedly è un lettore di feed RSS che consente agli utenti di aggregare e leggere i contenuti dei loro siti web preferiti in un unico posto. Feedly offre funzionalità come la categorizzazione dei feed, la possibilità di salvare articoli per leggerli in seguito, e l'integrazione con altre piattaforme come Evernote e Pocket. È una soluzione popolare per chi desidera rimanere aggiornato sulle ultime notizie e contenuti da diverse fonti online.
https://feedly.com/  (Feedly)

https://f-droid.org/it/packages/com.nunti/  (Nunti - un lettore di feed RSS open source per Android)


SQL è un linguaggio di programmazione utilizzato per gestire e manipolare database relazionali. SQL consente agli utenti di creare, leggere, aggiornare e cancellare dati all'interno di un database, nonché di definire la struttura del database stesso. È uno dei linguaggi più comuni per l'interazione con i database e viene utilizzato in una vasta gamma di applicazioni, dalle piccole applicazioni web ai grandi sistemi aziendali.
https://en.wikipedia.org/wiki/SQL  (SQL - Wikipedia)

Docker è una piattaforma di containerizzazione che consente agli sviluppatori di creare, distribuire e eseguire applicazioni in ambienti isolati chiamati container. I container sono leggeri, portatili e consistenti, il che significa che un'applicazione containerizzata funzionerà allo stesso modo su qualsiasi sistema che supporta Docker, indipendentemente dalle differenze nell'ambiente di sviluppo o di produzione. Docker semplifica il processo di sviluppo e distribuzione delle applicazioni, migliorando l'efficienza e la scalabilità.
https://www.docker.com/  (Docker)
https://www.docker.com/get-started  (Docker - Get started)

INSTALLIAMO DOCKER SUL NOSTRO PC.

Come funziona un server web?
Un server web è un software che gestisce le richieste HTTP da parte dei client (come i browser web) e restituisce le risposte appropriate, come pagine HTML, immagini o altri contenuti. Il server web ascolta le richieste su una porta specifica (di solito la porta 80 per HTTP o la porta 443 per HTTPS) e utilizza un protocollo di comunicazione per scambiare dati con i client. 
Quando un client invia una richiesta, il server web elabora la richiesta, recupera i dati necessari (ad esempio, da un database o da file statici) e restituisce la risposta al client, che poi visualizza il contenuto al utente finale.

Differenza tra server web e server di database:
Un server web è responsabile di gestire le richieste HTTP e restituire contenuti web, mentre un server di database è responsabile di gestire le richieste di dati e fornire accesso a un database. Il server web si occupa della logica di presentazione e dell'interazione con l'utente, mentre il server di database si occupa della gestione dei dati, delle query e delle operazioni di archiviazione. In un'applicazione web, il server web e il server di database lavorano insieme per fornire una funzionalità completa all'utente finale.

Differenza tra Virtual machine e container:
Una virtual machine (VM) è un ambiente di esecuzione completo che emula un sistema operativo, consentendo di eseguire più sistemi operativi su un singolo host fisico. Ogni VM include il proprio kernel, librerie e applicazioni, ed è isolata dalle altre VM.
Un container, d'altra parte, è un ambiente di esecuzione più leggero che condivide il kernel del sistema operativo host, ma isola le applicazioni e le loro dipendenze in modo che possano essere eseguite in modo indipendente. I container sono più efficienti in termini di risorse rispetto alle VM, poiché non richiedono un intero sistema operativo per ogni istanza, ma offrono comunque un alto livello di isolamento e portabilità.

Apache ed Nginx sono due dei server web più popolari e ampiamente utilizzati al mondo. Apache è noto per la sua flessibilità, estensibilità e supporto per una vasta gamma di moduli, mentre Nginx è apprezzato per le sue prestazioni elevate, la gestione efficiente delle connessioni e la capacità di gestire un gran numero di richieste simultanee. La scelta tra i due dipende dalle esigenze specifiche del progetto, dalle preferenze personali e dalle caratteristiche richieste dall'applicazione web.
Noi useremo Nginx come server web per la nostra applicazione Angular, poiché è noto per le sue prestazioni elevate e la capacità di gestire un gran numero di richieste simultanee, il che lo rende una scelta ideale per applicazioni web moderne e ad alto traffico. Inoltre, Nginx è facile da configurare e offre funzionalità avanzate come il bilanciamento del carico e la gestione delle connessioni, che possono migliorare ulteriormente le prestazioni della nostra applicazione.


---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Lezione di giovedì 5 marzo 2026:

Per nascondere la chiave API di Firebase, creiamo un environment file in Angular. Gli environment files sono file di configurazione che contengono variabili e impostazioni specifiche per diversi ambienti (sviluppo, produzione, ecc.). In questo modo, possiamo mantenere la chiave API di Firebase al sicuro e non esporla direttamente nel codice sorgente.

https://angular.dev/tools/cli/environments - (Angular CLI - Environments)

ng generate environments - per creare i file di environment

Ho copiato le apiKey e le altre configurazioni di Firebase nei file environment.ts e environment.prod.ts. In questo modo, possiamo accedere a queste variabili in modo sicuro all'interno del nostro codice Angular, senza esporle direttamente.

Poi, su gitignore, ho aggiunto i file environment.ts e environment.prod.ts per evitare che vengano tracciati da Git e quindi esposti pubblicamente su repository come GitHub.

Su firebase-service.ts, ho importato l'environment file e ho sostituito le variabili di configurazione di Firebase con le variabili definite negli environment files. In questo modo, quando eseguiamo l'applicazione in modalità sviluppo o produzione, verranno utilizzate le configurazioni appropriate senza esporre la chiave API direttamente nel codice sorgente.

angular.json è il file di configurazione principale per un progetto Angular. Contiene informazioni su come costruire, servire e testare l'applicazione, nonché configurazioni specifiche per diversi ambienti.

            "development": {
              "optimization": false,
              "extractLicenses": false,
              "sourceMap": true,
              "fileReplacements": [
                {
                  "replace": "src/environments/environment.ts",
                  "with": "src/environments/environment.development.ts"
                }..]..}

"replace" indica il file originale che vogliamo sostituire, mentre "with" indica il file che vogliamo utilizzare al suo posto durante la compilazione. In questo caso, stiamo dicendo ad Angular di sostituire environment.ts con environment.development.ts quando eseguiamo l'applicazione in modalità sviluppo. 
Questo ci permette di avere configurazioni diverse per ambienti diversi senza dover modificare manualmente il codice ogni volta.


environment.ts  e  environment.prod.ts sono file di configurazione in un progetto Angular che contengono variabili e impostazioni specifiche per diversi ambienti (sviluppo e produzione). 
Questi file vengono utilizzati per mantenere separate le configurazioni e le chiavi API, consentendo di utilizzare valori diversi a seconda dell'ambiente in cui l'applicazione viene eseguita.

export const environment = {
  production: false, // Imposta a true per abilitare le ottimizzazioni di produzione e disabilitare i messaggi di log in console.
  // false è utile durante lo sviluppo per vedere i messaggi di log e avere un ambiente più flessibile, mentre true è consigliato per la produzione per migliorare le prestazioni e la sicurezza.
  firebaseConfig: {   
    apiKey: "AIzaSyCTLd1TZjSo5FCifm2GFJU-XTQvp1Xi6zA",
    authDomain: "feed-reader-14409.firebaseapp.com",
    projectId: "feed-reader-14409",
    storageBucket: "feed-reader-14409.firebasestorage.app",
    messagingSenderId: "945417544215",
    appId: "1:945417544215:web:06c14ebcfeb6006bde3252"
  }
};


Ho creato il file Dockerfile per containerizzare la nostra applicazione Angular con Nginx. Il Dockerfile contiene le istruzioni per costruire l'immagine Docker, che include la compilazione dell'applicazione Angular e la configurazione di Nginx per servire i file statici.

 docker build -t feedreader:1.0.0 . - Questo comando costruisce l'immagine Docker utilizzando il Dockerfile presente nella directory corrente (indicato da ".") e assegna all'immagine il tag "feedReader:1.0.0". 
   Dopo aver eseguito questo comando, avrai un'immagine Docker pronta per essere eseguita come container.