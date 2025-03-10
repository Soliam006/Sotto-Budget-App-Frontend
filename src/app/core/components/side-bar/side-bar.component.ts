import {Component, ElementRef, HostListener, ViewChild} from '@angular/core';
import {UserService} from '../../../shared/services/user-service/user.service';
import {AuthService} from '../../../shared/services/auth-service/auth-service.service';
import {User} from '../../../shared/models/user';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {CommonModule} from '@angular/common';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-side-bar',
  imports: [
    RouterLink,
    CommonModule,
    MatIconModule,
    RouterLinkActive,
    ],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css'
})
export class SideBarComponent {
  user: User | null = null;
  sidebarOpen = false;
  dropdownOpen = false;
  constructor(private userService: UserService,
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
        email: 's@s.com',
        role: 'admin',
        language: 'en'
      }
    }
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
