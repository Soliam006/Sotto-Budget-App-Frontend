import {Component} from '@angular/core';
import {MatIcon} from '@angular/material/icon';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import {trigger, transition, style, animate} from '@angular/animations';
import {AuthValidators} from '../../../shared/validators/auth-validators';
import {AuthService} from '../../../shared/services/auth-service/auth-service.service';

@Component({
  selector: 'app-sign-up',
  imports: [
    MatIcon, CommonModule, ReactiveFormsModule, RouterLink
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({opacity: 0, transform: 'translateY(-10px)'}),
        animate('300ms ease-out', style({opacity: 1, transform: 'translateY(0)'}))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({opacity: 0, transform: 'translateY(-10px)'}))
      ])
    ])
  ]
})
export class SignUpComponent {

  signUpForm: FormGroup;
  showPassword: boolean = false;
  passwordStrength: number = 5;
  isShaking: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.signUpForm = this.fb.group({
      username: ['', [Validators.required, Validators.maxLength(25), Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', AuthValidators.passwordStrength()]
    });
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  getPasswordStrength(password: string): number {
    let strength = 5;
    if (password.length >= 8) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 25;
    if (/[^A-Za-z0-9]/.test(password)) strength += 25;
    return strength;
  }

  onPasswordInput() {
    const password = this.signUpForm.get('password')?.value || '';
    this.passwordStrength = this.getPasswordStrength(password);
  }

  getStrengthColor(): string {
    if (this.passwordStrength <= 25) return 'bg-red-500';
    if (this.passwordStrength <= 50) return 'bg-orange-500';
    if (this.passwordStrength <= 75) return 'bg-yellow-500';
    return 'bg-green-500';
  }

  isValidPassword(condition: String): string {
    const password = this.signUpForm.get('password')?.value || '';
    if (condition === "8LE")
      return password.length >= 4 ? 'text-green-500' : 'text-red-500';
    else if (condition === "MAS")
      return /[A-Z]/.test(password) ? 'text-green-500' : 'text-red-500';
    else if (condition === "NUM")
      return /[0-9]/.test(password) ? 'text-green-500' : 'text-red-500';
    else if (condition === "ESP")
      return /[^A-Za-z0-9]/.test(password) ? 'text-green-500' : 'text-red-500';

    return 'text-red-500';
  }

  isValidTextColor(condition: String): string {
    const password = this.signUpForm.get('password')?.value || '';
    if (condition === "8LE")
      return password.length >= 4 ? 'text-white' : 'text-white/60';
    else if (condition === "MAS")
      return /[A-Z]/.test(password) ? 'text-white' : 'text-white/60';
    else if (condition === "NUM")
      return /[0-9]/.test(password) ? 'text-white' : 'text-white/60';
    else if (condition === "ESP")
      return /[^A-Za-z0-9]/.test(password) ? 'text-white' : 'text-white/60';

    return 'text-white/40';
  }

  onSubmit() {
    if (this.signUpForm.invalid) {
      this.signUpForm.markAllAsTouched(); // Marca todos los campos como "tocados"
      return;
    }

    // Enviar formulario al servidor
    console.log('Formulario enviado', this.signUpForm.value);
    this.authService.register(this.signUpForm.value).subscribe({
      next: response => {
        console.log('Respuesta del servidor', response);
        // Redirigir al usuario a la página de inicio de sesión
        this.router.navigate(['/sign-in'], {
          queryParams: {username: this.signUpForm.get('username')?.value}
        });
      },
      error: error => {
        console.error('Error en la petición', error);
      }
    });
  }

}
