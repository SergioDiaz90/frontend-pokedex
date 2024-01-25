import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { SessionStorageService } from './session-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAuthenticated = false;
  private accessToken = '';

  constructor(
    private authApiService: ApiService,
    private sessionStorage: SessionStorageService
  ) {}

  async login(username: string, password: string) {
    try {
      let response = await this.authApiService.login(username, password).toPromise();
      if (response) {
        console.log('login', response)
        this.isAuthenticated = true;
        this.accessToken = response.accessToken;
        this.sessionStorage.insert('isLogged', this.accessToken);
        console.log('login', { token: this.accessToken })
        return true;
      }

      return false;

    } catch (e: any) {
      console.error('login', e.error.accessToken);
      if(e.error?.accessToken) {
        return true;
      }

      return false;
    }
  }

  async logout() {
    try {
      let response = await this.authApiService.logout(this.accessToken).toPromise();

      console.log('logout', response);
      if (response) {
        this.sessionStorage.remove('isLogged');
        this.isAuthenticated = false;
        this.accessToken = '';

        return true;
      }

      return false;
    } catch (e: any) {
      console.error('login', e.error);
      return false;
    }
  }

  isAuthenticatedUser(): boolean {
    return this.isAuthenticated;
  }

  isToken (): string {
    return this.accessToken === '' ? this.sessionStorage.select('isLogged') : this.accessToken;
  }
}
