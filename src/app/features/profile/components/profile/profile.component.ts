import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  imports: [MatCardModule, MatTabsModule, MatButtonModule, MatBadgeModule, MatIconModule, CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
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
}
