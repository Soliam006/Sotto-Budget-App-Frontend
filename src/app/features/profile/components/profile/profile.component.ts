import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import {UserServiceService} from '../../../../shared/services/user-service/user-service.service';
import {User} from '../../../../shared/models/user';
import {RouterLink, RouterLinkActive} from '@angular/router';

@Component({
  selector: 'app-profile',
  imports: [
    MatCardModule, MatTabsModule, MatButtonModule, MatBadgeModule,
    MatIconModule, CommonModule, RouterLink, RouterLinkActive
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  user: User | null = null;
  projects = [
    {
      id: 1,
      name: 'Casa de campo',
      description: 'Proyecto de construcción de una casa de campo en la localidad de Llucmajor.',
      status: 'En curso',
      progress: 0.6,
      tasks: 7,
      workers: 3,
      budget: 200000,
      spent: 120000,
    },
    {
      id: 2,
      name: 'Edificio de oficinas',
      description: 'Construcción de un edificio de oficinas en el centro de Palma.',
      status: 'En curso',
      progress: 0.4,
      tasks: 5,
      workers: 2,
      budget: 150000,
      spent: 80000,
    },
    {
      id: 3,
      name: 'Reforma de local',
      description: 'Reforma integral de un local comercial en el centro de Inca.',
      status: 'Finalizado',
      progress: 1,
      tasks: 3,
      workers: 1,
      budget: 50000,
      spent: 50000,
    },
  ];

  constructor(private userService: UserServiceService){
    this.user = this.userService.getUser();
    if (!this.user)
      this.user = {
        id: 1,
        username: 'Blas Sotto',
        email: 'blas@prova.com',
        role: 'admin',
        language: 'en'
      }
  }

  notifications = [
    {
      id: 1,
      title: 'Nueva tarea asignada',
      description: 'Se te ha asignado la tarea "Diseño de planos"',
      time: 'Hace 2 horas',
      read: false,
    },
    {
      id: 2,
      title: 'Comentario en tarea',
      description: 'María comentó en "Instalación eléctrica"',
      time: 'Hace 5 horas',
      read: false,
    },
    {
      id: 3,
      title: 'Recordatorio',
      description: 'La tarea "Preparación del terreno" vence mañana',
      time: 'Hace 1 día',
      read: true,
    },
  ];

  activities = [
    {
      id: 1,
      action: 'Completó la tarea',
      description: 'Cimientos',
      time: 'Hace 2 días',
    },
    {
      id: 2,
      action: 'Actualizó el material',
      description: 'Agregó "Cable eléctrico" a Instalación eléctrica',
      time: 'Hace 3 días',
    },
    {
      id: 3,
      action: 'Creó nueva tarea',
      description: 'Diseño de planos',
      time: 'Hace 5 días',
    },
  ];

  getNotReaded() {
    return this.notifications.filter(notification => !notification.read).length
  }

  getRole(role: string | undefined): string {
    if (!role) return 'No definido';
    return role === 'admin' ? 'Project Manager' : role === 'client' ? 'Cliente': 'Trabajador';
  }
}
