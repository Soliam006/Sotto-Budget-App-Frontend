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

  getUser(): User | null {
    return this.user$.value;
  }


  // Set the user
  setUser(user: User|null): void {
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

  changeUsernameName(username: string): void {
    this.user$.next({...this.user$.value, username});
  }

  changeEmail(email: string): void {
    this.user$.next({...this.user$.value, email});
  }

  changeToken(token: string): void {
    this.user$.next({...this.user$.value, token});
  }
}
