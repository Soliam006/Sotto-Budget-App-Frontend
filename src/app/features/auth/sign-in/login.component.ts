import {Component} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {AuthValidators} from '../../../shared/validators/auth-validators';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {AuthService} from '../../../shared/services/auth-service/auth-service.service';
import {NotifyService} from '../../../shared/services/notify-service/notify-service.service';

@Component({
  selector: 'app-login',
  imports: [MatIconModule, ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
              private fb: FormBuilder,
              private route: ActivatedRoute,
              private authService: AuthService,
              private router: Router,
  ) {
    this.loginForm = this.fb.group({
      username: ['', AuthValidators.emailOrUsername()],
      password: ['', AuthValidators.password()],
      rememberMe: [false]
    });
    // Verificar si el usuario ya está autenticado y no tiene un token expirado
    if (this.authService.isAuthenticated() && !this.authService.getExpriredToken()) {
      console.log('Token encontrado en el almacenamiento local');
      this.router.navigate(['/sottobudget']);
    }

    // Obtener el Username de los Parametros de la URL
    const username = this.route.snapshot.queryParamMap.get('username');
    if (username) {
      console.log('Username encontrado en los parámetros de la URL');
      this.loginForm.get('username')?.setValue(username);
    }
  }

  onSubmit() {
    // Enviar formValue al servidor
    // Si rememberMe es true, guardar el token en el almacenamiento local o en las cookies
    if (this.loginForm.valid) {
      console.log('Formulario enviado', this.loginForm.value);
      // Verificar si el usuario ingresó un email o un username
      this.sendFormToServer();

    } else {
      console.log('Formulario inválido');
    }
  }


  /**
   * Método para enviar el formulario al servidor, verifica si el usuario ingresó un email o un username
   */
  sendFormToServer() {
    const username = this.loginForm.get('username')?.value;
    const password = this.loginForm.get('password')?.value;
    const rememberMe = this.loginForm.get('rememberMe')?.value;

    const authRequest = username.includes('@')
      ? this.authService.get_access_token_with_email({username, password})
      : this.authService.get_access_token_with_username({username, password});

    authRequest;
  }
}
