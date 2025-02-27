import {Component, ElementRef, HostListener, ViewChild} from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-bottom-bar',
  imports: [
    CommonModule,
    MatIconModule,
    RouterLinkActive,
    RouterLink
  ],
  templateUrl: './bottom-bar.component.html',
  styleUrl: './bottom-bar.component.css'
})
export class BottomBarComponent {
  dropdownOpen = false;
  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  logout() {
    // Aquí puedes implementar la lógica de cierre de sesión
    console.log('Cerrando sesión...');
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
