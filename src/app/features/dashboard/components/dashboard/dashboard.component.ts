// dashboard.component.ts
import {Component} from '@angular/core';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {MatCardModule} from '@angular/material/card';
import {MatBadgeModule} from '@angular/material/badge';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {TaskDetailsDialogComponent} from '../task-details/task-details-dialog.component';
import {ConfirmDialogComponent} from '../confirm-dialog/confirm-dialog.component';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [
    DragDropModule,
    NgxChartsModule,
    MatCardModule,
    MatBadgeModule,
    MatProgressBarModule,
    CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  tasks = {
    todo: [
      {
        id: '1',
        title: 'Diseño de planos',
        description: 'Crear planos arquitectónicos detallados',
        assignee: {name: 'Ana García', avatar: '/placeholder.svg'},
        dueDate: '2024-03-01',
        materials: [{name: 'Software CAD', price: 299}, {name: 'Tablet gráfica', price: 599}]
      },
      {
        id: '2',
        title: 'Preparación del terreno',
        description: 'Limpieza y nivelación del área de construcción',
        assignee: {name: 'Carlos Ruiz', avatar: '/placeholder.svg'},
        dueDate: '2024-03-05',
        materials: [{name: 'Excavadora', price: 1200}, {name: 'Material de relleno', price: 450}]
      }
    ],
    inProgress: [
      {
        id: '3',
        title: 'Instalación eléctrica',
        description: 'Cableado y conexiones eléctricas principales',
        assignee: {name: 'Luis Torres', avatar: '/placeholder.svg'},
        dueDate: '2024-03-10',
        materials: [{name: 'Cable eléctrico', price: 850}, {name: 'Cajas de conexión', price: 200}]
      }
    ],
    done: [
      {
        id: '4',
        title: 'Cimientos',
        description: 'Construcción de cimientos y bases',
        assignee: {name: 'María Sánchez', avatar: '/placeholder.svg'},
        dueDate: '2024-02-28',
        materials: [{name: 'Cemento', price: 1500}, {name: 'Varillas de acero', price: 2000}]
      }
    ]
  };

  statusColors = {todo: 'bg-blue-500', inProgress: 'bg-yellow-500', done: 'bg-green-500'};
  statusNames = {todo: 'Por hacer', inProgress: 'En progreso', done: 'Completado'};

  selectedTask: any = null;
  showTaskDetails = false;
  showConfirmDialog = false;
  dragInfo: { task: any; source: any; destination: any; sourceIndex: number; destinationIndex: number } | null = null;

  constructor(private dialog: MatDialog, private snackBar: MatSnackBar) {
  }

  onDragEnd(event: any) {
    if (!event.destination) return;

    const sourceColumn: keyof typeof this.tasks = event.source.droppableId;
    const destinationColumn: keyof typeof this.tasks = event.destination.droppableId;

    if (sourceColumn === destinationColumn) {
      const newTasks = {...this.tasks};
      const column = [...this.tasks[sourceColumn]];
      const [removed] = column.splice(event.source.index, 1);
      column.splice(event.destination.index, 0, removed);
      newTasks[sourceColumn] = column;
      this.tasks = newTasks;
    } else {
      this.dragInfo = {
        task: this.tasks[sourceColumn][event.source.index],
        source: sourceColumn,
        destination: destinationColumn,
        sourceIndex: event.source.index,
        destinationIndex: event.destination.index
      };
      this.showConfirmDialog = true;
    }
  }

  confirmMove() {
    if (!this.dragInfo) return;
    const source: keyof typeof this.tasks
      = this.dragInfo.source;
    const destination: keyof typeof this.tasks = this.dragInfo.destination;

    const newTasks = {...this.tasks};
    const sourceColumn = [...this.tasks[source]];
    const destinationColumn = [...this.tasks[destination]];
    const [removed] = sourceColumn.splice(this.dragInfo.sourceIndex, 1);
    destinationColumn.splice(this.dragInfo.destinationIndex, 0, removed);
    newTasks[source] = sourceColumn;
    newTasks[destination] = destinationColumn;
    this.tasks = newTasks;
    this.showConfirmDialog = false;
    this.dragInfo = null;
  }

  openTaskDetails(task: any) {
    this.selectedTask = task;
    this.showTaskDetails = true;
    this.dialog.open(TaskDetailsDialogComponent, {
      data: task
    });
  }

  openConfirmDialog() {
    this.dialog.open(ConfirmDialogComponent, {
      data: this.dragInfo
    }).afterClosed().subscribe(result => {
      if (result) {
        this.confirmMove();
      }
    });
  }
}
