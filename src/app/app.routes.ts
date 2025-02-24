import {Routes} from '@angular/router';
import {SottobudgetComponent} from './features/sottobudget/sottobudget.component';

export const routes: Routes = [
  {path: '', redirectTo: 'sign-in', pathMatch: 'full'},
  {path: 'home', loadComponent: () => import('./features/home/components/home/home.component').then(m => m.HomeComponent)},
  {
    path: 'sottobudget', component: SottobudgetComponent,
    children: [
      {path: '', redirectTo: 'profile', pathMatch: 'full'},
      {path: 'dashboard', loadComponent: () => import('./features/dashboard/components/dashboard/dashboard.component').then(m => m.DashboardComponent)},
      {path: 'profile', loadComponent: () => import('./features/profile/components/profile/profile.component').then(m => m.ProfileComponent)},
      {path: '**', redirectTo: 'not-found'},
      {path: 'not-found', loadComponent: () => import('./features/z-not-found/not-found/not-found.component').then(m => m.NotFoundComponent)}
    ]
  },
  {path: 'sign-in', loadComponent: () => import('./features/auth/sign-in/login.component').then(m => m.LoginComponent)},
  {path: 'sign-up', loadComponent: () => import('./features/auth/sign-up/sign-up.component').then(m => m.SignUpComponent)},
  {path: '**', redirectTo: 'not-found'},
  {path: 'not-found', loadComponent: () => import('./features/z-not-found/not-found/not-found.component').then(m => m.NotFoundComponent)}
];
