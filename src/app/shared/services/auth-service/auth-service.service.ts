import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
//Environment
import { environment } from '../../../../environments/environment';
import {Router} from '@angular/router';
import {NotifyService} from '../notify-service/notify-service.service';
import {Response} from '../../models/response';
import {UserService} from '../user-service/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // URL base del API de autenticación. Cambia este valor según tu backend.
  private apiUrl = environment.apiUrl + '/users';
  private expireToken: boolean = false;

  constructor(private http: HttpClient,
              private router: Router,
              private notify: NotifyService,
              private userService: UserService) { }

  /**
   * Realiza el login enviando las credenciales al backend.
   * @param credentials Objeto con email y password.
   * @returns Un observable con la respuesta del servidor.
   */
  get_access_token_with_email(credentials: { username: string, password: string }) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });

    this.http.post(`${this.apiUrl}/token_email`, credentials, { headers }).
    subscribe({
      next: response => {
        this.validateResponse(response as Response);
      },
      error: error => {
        this.notify.error('Error en la petición', "Something went Wrong");
        console.error('Error en la petición', error);
      }
    });
  }

  get_access_token_with_username(credentials: { username: string, password: string }){

    const   headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'accept': 'application/json',
    });

    this.http.post(`${this.apiUrl}/token_username`, credentials, { headers }).subscribe({
      next: response => {
        this.validateResponse(response as Response);
      },
      error: error => {
        this.notify.error('Error en la petición', "Something went Wrong");
        console.error('Error en la petición', error);
      }
    });
  }

  validateResponse(response: Response){
    console.log('Respuesta del servidor', response);
    if(response.statusCode == 401){
      this.notify.error('Could not validate Credentials', response.message);
    }
    else if(response.statusCode == 200){
      this.notify.success('Success', response.message);
      localStorage.setItem('token', response.data.access_token);
      this.userService.setUser(response.data.user);
      this.router.navigate(['/sottobudget']);
    }
  }

  /**
   * Realiza el logout, por ejemplo, invalidando el token en el backend.
   * @returns Un observable con la respuesta del servidor.
   */
  logout(): Observable<any> {
    localStorage.removeItem('token');
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
