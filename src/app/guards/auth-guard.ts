import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth-service';
import { effect, inject } from '@angular/core';

//questo è un guard che mi serve per proteggere le rotte, in questo caso la rotta del dashboard, se non sono autenticato mi reindirizza alla pagina di login. 
//In questo caso è un guard asincrono, perché voglio che torni una Promise, in modo da poter gestire meglio il flusso di autenticazione.

export const authGuard: CanActivateFn = (route, state) => {
  //return true;
  const authServ = inject(AuthService);
  const router = inject(Router);

   //lo voglio tornare asincrono. Che torni una Promise

   return new Promise((resolve, reject) => {
    // if (!authServ) {     //è inutile in questo caso
    //   reject(false);
    // }
    effect(() => {
      if (authServ.isAuth()) {
        resolve(true);
      }else{
        router.navigate(['/login']);
        resolve(false);    //in entrambi casi sono corretti, non ho bisogno del reject
      }
    })
   })
}; 

