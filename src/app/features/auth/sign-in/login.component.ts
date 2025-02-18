import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {AuthValidators} from '../../../shared/validators/auth-validators';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [MatIconModule, ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      emailOrUsername: ['', AuthValidators.emailOrUsername()],
      password: ['', AuthValidators.password()],
      rememberMe: [false]
    });
  }

  onSubmit() {
    const formValue = this.loginForm.value;
    // Enviar formValue al servidor
    // Si rememberMe es true, guardar el token en el almacenamiento local o en las cookies
    if (this.loginForm.valid) {
      console.log('Formulario enviado', this.loginForm.value);
    } else {
      console.log('Formulario inválido');
    }
  }
}
