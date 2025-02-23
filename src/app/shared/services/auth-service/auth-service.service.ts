import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
//Environment
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // URL base del API de autenticación. Cambia este valor según tu backend.
  private apiUrl = environment.apiUrl + '/users';
  private expireToken: boolean = false;

  constructor(private http: HttpClient) { }

  /**
   * Realiza el login enviando las credenciales al backend.
   * @param credentials Objeto con email y password.
   * @returns Un observable con la respuesta del servidor.
   */
  get_access_token_with_email(credentials: { username: string, password: string }): Observable<any> {
    const headers = new HttpHeaders({
      'Accept': 'application/json'
    });

    const url = `${this.apiUrl}/token_email?email=${credentials.username}&password=${credentials.password}`;

    return this.http.post(url, {}, { headers });
  }

  get_access_token_with_username(credentials: { username: string, password: string }): Observable<any> {

    const body = new HttpParams()
      .set('username', credentials.username)
      .set('password', credentials.password);
    const   headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'accept': 'application/json',
    });

    return this.http.post(`${this.apiUrl}/token`, body, { headers: headers });
  }

  /**
   * Realiza el logout, por ejemplo, invalidando el token en el backend.
   * @returns Un observable con la respuesta del servidor.
   */
  logout(): Observable<any> {
    return this.http.post(`${this.apiUrl}/logout`, {});
  }

  /**
   * Comprueba si el usuario está autenticado.
   * En este ejemplo, se verifica la existencia de un token en el localStorage.
   * @returns true si el token existe, false de lo contrario.
   */
  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  /**
   * Registra un nuevo usuario enviando sus datos al backend.
   * @param user Objeto con los datos del usuario (nombre, email y password).
   * @returns Un observable con la respuesta del servidor.
   */
  register(user: { username: string, email: string, password: string }): Observable<any> {
    console.log(user);
    return this.http.post(`${this.apiUrl}/`, user);
  }

  getExpriredToken() {
    return this.expireToken
  }
  setExpireToken(expireToken: boolean) {
    this.expireToken = expireToken;
  }
}
