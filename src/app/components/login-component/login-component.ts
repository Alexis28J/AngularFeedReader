import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth-service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login-component',
  imports: [FormsModule, RouterLink],
  templateUrl: './login-component.html',
  styleUrl: './login-component.scss',
})
export class LoginComponent {

email: string = '';
password: string = '';
authServ = inject(AuthService);
errorMessage = signal('');
router = inject(Router);

doLogin() {
//console.log(this.email, this.password);
this.authServ.loginWithMailAndPassword(this.email, this.password).then(() => {
       this.router.navigate(['/home']);
    }).catch((err) => {
      this.errorMessage.set(err.message);
    });
}

}
