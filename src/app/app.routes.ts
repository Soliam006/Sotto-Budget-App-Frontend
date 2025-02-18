import { Routes } from '@angular/router';
import {LoginComponent} from './features/auth/sign-in/login.component';
import {SignUpComponent} from './features/auth/sign-up/sign-up.component';

export const routes: Routes = [
  { path: 'sign-in', component: LoginComponent},
  { path: 'sign-up', component: SignUpComponent}
];
