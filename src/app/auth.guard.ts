import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';
import { SessionStorageService } from './services/session-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private sessionStorage: SessionStorageService,
    private router: Router
  ) {}

  canActivate(): boolean {
    if (this.authService.isAuthenticatedUser() || this.sessionStorage.select('isLogged')) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
  
}
