import { Routes } from '@angular/router';
import { HomeComponent } from './components/home-component/home-component';
import { LoginComponent } from './components/login-component/login-component';
import { authGuard } from './guards/auth-guard';
import { RegisterComponent } from './components/register-component/register-component';

export const routes: Routes = [
    {path: '', redirectTo: '/home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent, canActivate: [authGuard]},
    {path: 'login', component:LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: '**', redirectTo: '/home', pathMatch: 'full'},
];
