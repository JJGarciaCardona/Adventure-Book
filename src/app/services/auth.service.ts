import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();
  private readonly correctPassword = '28/10/28';

  constructor() {
    // Check if user is already authenticated (persist authentication)
    const isAuth = localStorage.getItem('isAuthenticated') === 'true';
    this.isAuthenticatedSubject.next(isAuth);
  }

  login(password: string): boolean {
    const isValid = password === this.correctPassword;

    if (isValid) {
      this.isAuthenticatedSubject.next(true);
      localStorage.setItem('isAuthenticated', 'true');
    }

    return isValid;
  }

  logout(): void {
    this.isAuthenticatedSubject.next(false);
    localStorage.removeItem('isAuthenticated');
  }

  isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }
}
