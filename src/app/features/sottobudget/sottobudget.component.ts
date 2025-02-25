import {Component, ElementRef, HostListener, ViewChild} from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import { CommonModule} from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {UserServiceService} from '../../shared/services/user-service/user-service.service';
import {User} from '../../shared/models/user';
import {AuthService} from '../../shared/services/auth-service/auth-service.service';

@Component({
  selector: 'app-sottobudget',
  imports: [
    RouterOutlet,
    RouterLink,
    CommonModule,
    MatIconModule,
    RouterLinkActive
  ],
  templateUrl: './sottobudget.component.html',
  styleUrl: './sottobudget.component.css'
})
export class SottobudgetComponent {
  user: User | null = null;
  sidebarOpen = false;
  dropdownOpen = false;


  constructor(private userService: UserServiceService,
              private auth: AuthService,
              private eRef: ElementRef
  ) {
    // Suscribirse al usuario
    this.user = this.userService.getUser();
    // POR AHORA NO HAY USER; LLENO CON UNO DE PRUEBA
    if (!this.user) {
      this.user = {
        id: 1,
        username: 'Blas Sotto',
        email: 'Jo@prova.com',
        role: 'admin',
        language: 'en'
      }
    }
  }

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  toggleDropdown(event: Event) {
    event.stopPropagation(); // Evita que el click en el botón cierre inmediatamente el menú
    this.dropdownOpen = !this.dropdownOpen;
  }

  logout() {
    // Aquí puedes implementar la lógica de cierre de sesión
    console.log('Cerrando sesión...');
    this.userService.setUser(null);
    this.auth.logout();
  }

  getInitials(username?: string): string {
    if (!username) return 'U';
    const initials = username
      .split(' ')
      .map(word => word.charAt(0).toUpperCase())
      .join('');
    return initials.length > 2 ? initials.slice(0, 2) : initials;
  }
  @ViewChild('dropdownMenu', {static: false}) dropdownMenu!: ElementRef;

  // Detectar clics fuera del dropdown para cerrarlo
  // Detectar clics fuera del dropdown
  @HostListener('document:click', ['$event'])
  clickOutside(event: Event) {
    if (
      this.dropdownOpen &&
      this.dropdownMenu &&
      !this.dropdownMenu.nativeElement.contains(event.target)
    ) {
      this.dropdownOpen = false;
    }
  }
}
