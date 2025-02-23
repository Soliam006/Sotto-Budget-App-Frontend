import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  // Listener for user changes
  user$ = new BehaviorSubject<User |null>(null);
  user= this.user$.asObservable();

  token: string | null = null;

  constructor() { }

  setToken(token: string): void {
    this.token = token;
  }


  // Set the user
  setUser(user: User): void {
    this.user$.next(user);
  }

  changeLanguage(language: string): void {
    this.user$.next({...this.user$.value, language});
  }

  changeAvatar(avatar: string): void {
    this.user$.next({...this.user$.value, avatar});
  }

  changeRole(role: string): void {
    this.user$.next({...this.user$.value, role});
  }

  changeName(name: string): void {
    this.user$.next({...this.user$.value, name});
  }

  changeEmail(email: string): void {
    this.user$.next({...this.user$.value, email});
  }

  changeToken(token: string): void {
    this.user$.next({...this.user$.value, token});
  }
}
