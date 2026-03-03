import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth-service';
import { effect, inject } from '@angular/core';
import { onAuthStateChanged } from 'firebase/auth';


export const authGuard: CanActivateFn = (route, state) => {
  //return true;
  const authServ = inject(AuthService);
  const router = inject(Router);

   //*1

   return new Promise((resolve, _) => {   //*2
    // if (!authServ) {     //è inutile in questo caso
    //   reject(false);
    // }
    // effect(() => {   //*3
    //   if (authServ.isAuth()) {
    //     resolve(true);
    //   }else{
    //     router.navigate(['/login']);
    //     resolve(false);    //in entrambi casi sono corretti, non ho bisogno del reject
    //   }
    // })

  onAuthStateChanged(authServ.auth, (user) => { //*4
      if (user) {
         resolve (true);
      } else {
         router.navigate(['/login']);
         resolve(false);
      }
      });
   })
}; 

