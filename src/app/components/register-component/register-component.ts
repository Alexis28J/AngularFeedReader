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

  email = '';  //*1
  password = '';
  confirmPassword = '';
  errorMessage = signal(''); //*2


  authServ = inject(AuthService); //*3
  router = inject(Router);  //*4


  //Non usiamo il costruttore, perché con Angular moderno inject() è più diretto e leggibile.


  doRegister() {  //Metodo principale

    // if (!this.email || !this.password) {   //*5 Validazione base
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


  private translateFirebaseError(code: string): string {  //* 6
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
