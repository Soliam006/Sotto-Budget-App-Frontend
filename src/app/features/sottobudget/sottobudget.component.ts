import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import { CommonModule} from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {UserServiceService} from '../../shared/services/user-service/user-service.service';
import {AuthService} from '../../shared/services/auth-service/auth-service.service';
import {SideBarComponent} from '../../core/components/side-bar/side-bar.component';
import {BottomBarComponent} from '../../core/components/bottom-bar/bottom-bar.component';

@Component({
  selector: 'app-sottobudget',
  imports: [
    RouterOutlet,
    CommonModule,
    MatIconModule,
    SideBarComponent,
    BottomBarComponent
  ],
  templateUrl: './sottobudget.component.html',
  styleUrl: './sottobudget.component.css'
})
export class SottobudgetComponent {

  constructor(private userService: UserServiceService,
              private auth: AuthService
  ) { }

  logout() {
    // Aquí puedes implementar la lógica de cierre de sesión
    console.log('Cerrando sesión...');
    this.userService.setUser(null);
    this.auth.logout();
  }

}
