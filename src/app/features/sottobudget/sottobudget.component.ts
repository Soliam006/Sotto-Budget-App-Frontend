import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import { CommonModule} from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {UserService} from '../../shared/services/user-service/user.service';
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

  constructor(private userService: UserService,
              private auth: AuthService
  ) {

    console.log("USER INFO", this.userService.getUser());
  }

  logout() {
    // Aquí puedes implementar la lógica de cierre de sesión
    console.log('Cerrando sesión...');
    this.userService.setUser(null);
    this.auth.logout();
  }

}
