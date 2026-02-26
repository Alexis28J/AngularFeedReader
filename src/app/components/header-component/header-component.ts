import { Component, inject } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-header-component',
  imports: [RouterLink],
  templateUrl: './header-component.html',
  styleUrl: './header-component.scss',
})
export class HeaderComponent {

  authServ = inject(AuthService);
  router = inject(Router);

  doLogout() {
  this.authServ.logout().then(() => {
       this.router.navigate(['/login']);
  });
}
}
