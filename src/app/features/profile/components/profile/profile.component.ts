import {Component} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatTabsModule} from '@angular/material/tabs';
import {MatButtonModule} from '@angular/material/button';
import {MatBadgeModule} from '@angular/material/badge';
import {MatIconModule} from '@angular/material/icon';
import {CommonModule} from '@angular/common';
import {UserService} from '../../../../shared/services/user-service/user.service';
import {User} from '../../../../shared/models/user';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {ProfileEditSectionComponent} from '../profile-edit-section/profile-edit-section.component';
import {BehaviorSubject} from 'rxjs';
import { FollowDialogComponent } from '../follow-dialog/follow-dialog.component';

@Component({
  selector: 'app-profile',
  imports: [
    MatCardModule,
    MatTabsModule,
    MatButtonModule,
    MatBadgeModule,
    MatIconModule,
    CommonModule, RouterLink, RouterLinkActive,
    ReactiveFormsModule,
    MatFormFieldModule, MatDatepickerModule, ProfileEditSectionComponent,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  user: User | null = null;
  isEditing = false;
  // Signal Save
  save$ = new BehaviorSubject(false);
  saved = this.save$.asObservable();

  readonly range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });
  dateRanges: { start: Date, end: Date }[] = [];

  changeEditing(): void {
    this.isEditing = !this.isEditing;
  }

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

  constructor(
    private userService: UserService,
    private dialog: MatDialog
  ) {
    this.user = this.userService.getUser();
    if (!this.user)
      this.user = {
        id: 1,
        username: 'Blas Sotto',
        email: 'blas@prova.com',
        role: 'admin',
        language: 'en'
      }
    this.saved.subscribe((value) => {
      console.log("SAVED IN FATHER");
    });
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
    return role === 'admin' ? 'Project Manager' : role === 'client' ? 'Cliente' : 'Trabajador';
  }

  activeTab: string = 'notifications';

  userData = {
    name: 'Blas Sotto',
    role: 'Project Manager',
    avatar: '/placeholder.svg',
    stats: {
      projects: 12,
      followers: 28,
      following: 34,
      requests: 5,
    },
    notifications: [
      {
        id: 1,
        title: 'Nueva tarea asignada',
        description: 'Se te ha asignado la tarea "Diseño de planos"',
        time: 'Hace 2 horas',
        isNew: true,
      },
      {
        id: 2,
        title: 'Nuevo seguidor',
        description: 'Carlos Méndez ha comenzado a seguirte',
        time: 'Hace 5 horas',
        isNew: false,
      },
    ],
    following: [
      { id: 1, name: 'Ana García', role: 'Worker', avatar: '/favicon.ico', username: 'ana.garcia' },
      { id: 2, name: 'Miguel López', role: 'Worker', avatar: '/favicon.ico', username: 'migueez' },
      { id: 3, name: 'Laura Sánchez', role: 'Cliente', avatar: '/favicon.ico', username: 'laura.sanchez' },
      { id: 4, name: 'Javier Martínez', role: 'Electricista', avatar: '/favicon.ico', username: 'javier.martinez' },
      { id: 5, name: 'Sofía Rodríguez', role: 'Decoradora', avatar: '/favicon.ico', username: 'sofia.rodri' },
      { id: 6, name: 'Pablo Hernández', role: 'Worker', avatar: '/favicon.ico', username: 'pablo.herz' },
      { id: 7, name: 'Elena Ruiz', role: 'Admin', avatar: '/favicon.ico', username: 'elena.rz' },
    ],
    followers: [
      { id: 1, name: 'Carlos Méndez', role: 'Constructor', avatar: '/favicon.ico', username: 'car.Mendez' },
      { id: 2, name: 'Elena Ruiz', role: 'Contratista', avatar: '/favicon.ico', username: 'elena.rz' },
    ],
    requests: [
      { id: 1, name: 'Javier Martínez', role: 'Electricista', avatar: '/favicon.ico', username: 'javier.martinez' },
      { id: 2, name: 'Sofía Rodríguez', role: 'Decoradora', avatar: '/favicon.ico', username: 'sofia.rodri' },
      { id: 3, name: 'Pablo Hernández', role: 'Fontanero', avatar: '/favicon.ico', username: 'pablo.herz' },
    ],
  };

  handleAcceptRequest(id: number) {
    console.log(`Solicitud ${id} aceptada`);
  }

  handleRejectRequest(id: number) {
    console.log(`Solicitud ${id} rechazada`);
  }

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }
  getNotReadedNew() {
    return this.userData.notifications.filter(n => n.isNew).length
  }
  openDialog(type: 'followers' | 'following') {
    this.dialog.open(FollowDialogComponent, {
      data: { list: type === 'followers' ? this.userData.followers : this.userData.following, title: type === 'followers' ? 'Seguidores' : 'Siguiendo' },
    });
  }

  acceptRequest(user: { role: string; name: string; id: number; avatar: string; username: string } | {
    role: string;
    name: string;
    id: number;
    avatar: string;
    username: string
  } | { role: string; name: string; id: number; avatar: string; username: string }) {
    
  }

  rejectRequest(user: { role: string; name: string; id: number; avatar: string; username: string } | {
    role: string;
    name: string;
    id: number;
    avatar: string;
    username: string
  } | { role: string; name: string; id: number; avatar: string; username: string }) {
    
  }
}
