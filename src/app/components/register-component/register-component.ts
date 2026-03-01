import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth-service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register-component',
  imports: [FormsModule, RouterLink],
  templateUrl: './register-component.html',
  styleUrl: './register-component.scss',
})
export class RegisterComponent {

  email = '';
  password = '';
  confirmPassword = '';
  errorMessage = signal('');

  // email e password sono le variabili legate agli input del form con [(ngModel)].

  //Uso errorMessage per mostrare eventuali errori, è un signal che contiene una stringa e si aggiorna quando c'è un errore.
  //Ad esempio se l'email è già in uso, mostro un messaggio di errore.
  // errorMessage() → leggi il valore
  // errorMessage.set('testo') → aggiorni il valore
  //Lo usiamo per mostrare errori nel template in modo reattivo.


  authServ = inject(AuthService);
  router = inject(Router);

  //authServ: è un’istanza del tuo AuthService, ottenuta con inject.
  //router: è il Router di Angular, per fare navigate(['/home']).
  //Non usiamo il costruttore, perché con Angular moderno inject() è più diretto e leggibile.


  doRegister() {  //Metodo principale

    // if (!this.email || !this.password) {   //* Validazione base
    //   this.errorMessage.set('Inserisci email e password');
    //   return;
    // }
    if (!this.email || !this.password && this.confirmPassword) {  
      this.errorMessage.set('Compila tutti i campi');
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.errorMessage.set('Le password non coincidono!');
      return;   //Se le password non coincidono, il metodo si ferma e non chiama Firebase.
    }


    this.authServ.registerWithEmailAndPassword(this.email, this.password)  //Chiamata a Firebase tramite AuthService
      .then(() => { this.router.navigate(['/home']) })   //Se va bene
      .catch((err) => { this.errorMessage.set(this.translateFirebaseError(err.code)) });  //Se va male
  }

  // Validazione base: 
  //Controllo se email e password sono vuoti, se sì mostro un messaggio di errore e esco.
  //Se email o password sono vuote → non chiami Firebase.
  //Imposti un messaggio di errore leggibile.
  //return; interrompe il metodo.

  // Chiamata a Firebase tramite AuthService:
  //Usa il metodo che hai definito nell’AuthService, che internamente chiama createUserWithEmailAndPassword.
  //Ritorna una Promise.

  //Se va bene 
  // Se la registrazione ha successo:
  // Firebase crea l’utente.
  // onAuthStateChanged nel tuo AuthService imposta isAuth(true).
  // Qui fai il redirect alla pagina /home.


  //Se va male
  // Se Firebase lancia un errore:
  // err.code è un codice tipo auth/email-already-in-use, cioè un identificatore dell’errore.
  // Lo passiamo a translateFirebaseError per trasformarlo in un messaggio in italiano.
  // Aggiorniamo errorMessage, che il template mostrerà.

  private translateFirebaseError(code: string): string {
    switch (code) {
      case 'auth/email-already-in-use':
        return 'Questa email è già registrata.';
      case 'auth/invalid-email':
        return 'Email non valida.';
      case 'auth/weak-password':
        return 'La password è troppo debole.';
      default:
        return 'Errore durante la registrazione.';
    }
  }

  // Scopo: non mostrare all’utente i messaggi brutti e tecnici di Firebase.
  //(code: string) → è il codice di errore che Firebase restituisce, ad esempio auth/email-already-in-use.
  //:string → la funzione ritorna una stringa, che è il messaggio in italiano da mostrare all’utente.
  // switch (code):
  //   - per ogni codice noto, ritorni un messaggio chiaro in italiano.
  //   - default copre tutti i casi non gestiti.
  // È private perché serve solo dentro questo componente.


}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// 1 L’utente compila email, password e conferma password.
// 2 doRegister() controlla che:
//   - i campi non siano vuoti
//   - le password coincidano
// 3 Se tutto è ok → chiama Firebase.
// 4 Firebase crea l’utente.
// 5 onAuthStateChanged nel tuo AuthService imposta isAuth(true).
// 6 L’utente viene reindirizzato alla home.
