import { Injectable } from '@angular/core';
import { userMocks } from '../../utils/user-mocks';
import { BehaviorSubject, Observable } from 'rxjs';
import { TUser } from '../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject: BehaviorSubject<TUser | null>;
  public user$: Observable<TUser | null>;

  constructor() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.userSubject = new BehaviorSubject<TUser | null>(user);
    this.user$ = this.userSubject.asObservable();
   }

  login(email: string, password: string): boolean {

    if (email === '' || password === '') return false;

    const user = userMocks.find(user => user.email === email && user.password === password);
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      this.userSubject.next(user);
      return true;
    }

    return false;
  }

  logout(): void {
    localStorage.removeItem('user');
    this.userSubject.next(null);
  }

  getUser(): TUser | null{
    return this.userSubject.value;
  }

  isAuthenticated(): boolean {
    return !!this.userSubject.value;
  }

  updateUser(user: any): void {
    localStorage.setItem('user', JSON.stringify(user));
    this.userSubject.next(user);
  }
}
