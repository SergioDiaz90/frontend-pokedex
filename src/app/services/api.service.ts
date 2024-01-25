import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = environment.endpoint;
  private headers = new HttpHeaders();

  constructor(private http: HttpClient) {}

  private setHeadersJwt (accessToken: string) {
    return new HttpHeaders().set('Authorization', accessToken);
  }

  private getMethod (path: string, options?: any, useApi: boolean = true): any {
    let url = useApi ? `${this.baseUrl}/${path}` : `${path}`
    return this.http.get(url, options);
  }

  private postMethod (path: string, body: any, headers?: HttpHeaders): any {
    return this.http.post(`${this.baseUrl}/${path}`, body, { headers });
  }

  login(username: string, password: string): Observable<any> {
    const loginData = { username, password };
    return this.postMethod('auth/login', loginData);
  }

  logout(accessToken: string): Observable<any> {
    this.headers.set('Authorization', accessToken);
    console.log('logout', accessToken);
    return this.postMethod('auth/logout', {}, this.setHeadersJwt(accessToken));
  }

  getPokemonList (accessToken: string) {
    return this.getMethod('api/pokemon-list', { headers: this.setHeadersJwt(accessToken)});
  }

  getPokemonListMore (accessToken: string, page: string) {
    let headers = this.setHeadersJwt(accessToken);
    let body = {
      destiny: "next",
      number_page: page
    }
    
    return this.postMethod('api/pokemon-list/more', body, headers);
  }
}
