import {Routes} from '@angular/router';
import {LoginComponent} from './features/auth/sign-in/login.component';
import {SignUpComponent} from './features/auth/sign-up/sign-up.component';
import {HomeComponent} from './features/home/components/home/home.component';
import {DashboardComponent} from './features/dashboard/components/dashboard/dashboard.component';
import {ProfileComponent} from './features/profile/components/profile/profile.component';
import {SottobudgetComponent} from './features/sottobudget/sottobudget.component';
import {NotFoundComponent} from './features/z-not-found/not-found/not-found.component';

export const routes: Routes = [
  {path: '', redirectTo: 'sign-in', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {
    path: 'sottobudget', component: SottobudgetComponent,
    children: [
      {path: '', redirectTo: 'profile', pathMatch: 'full'},
      {path: 'dashboard', component: DashboardComponent},
      {path: 'profile', component: ProfileComponent},
      {path: '**', redirectTo: 'not-found'},
      {path: 'not-found', component: NotFoundComponent}
    ]
  },
  {path: 'sign-in', component: LoginComponent},
  {path: 'sign-up', component: SignUpComponent},
  {path: '**', redirectTo: 'not-found'},
  {path: 'not-found', component: NotFoundComponent}
];
