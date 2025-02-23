import { Component } from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import { CommonModule} from '@angular/common';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-sottobudget',
  imports: [
    RouterOutlet,
    RouterLink,
    CommonModule,
    MatIconModule
  ],
  templateUrl: './sottobudget.component.html',
  styleUrl: './sottobudget.component.css'
})
export class SottobudgetComponent {

}
