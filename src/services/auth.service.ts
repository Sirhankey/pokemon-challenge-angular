import { Injectable } from '@angular/core';
import { userMocks } from '../utils/user-mocks';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  login(email: string, password: string): boolean {

    if (email === '' || password === '') return false;

    const user = userMocks.find(user => user.email === email && user.password === password);
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      return true;
    }

    return false;
  }

  logout(): void {
    localStorage.removeItem('user');
  }

  getUser(): any {
    return JSON.parse(localStorage.getItem('user') || '{}');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('user');
  }
}
