import { Routes } from '@angular/router';
import { AccountComponent } from './account/account.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

export const routes: Routes = [
    { path: 'account/:email', component: AccountComponent}, 
    { path: 'account', component: AccountComponent}, 
    { path: 'login', component: LoginComponent}, 
    { path: 'register', component: RegisterComponent}, 
    { path: 'home', component: HomeComponent}, 
    { path: '', redirectTo: 'home', pathMatch: 'full'}
];
