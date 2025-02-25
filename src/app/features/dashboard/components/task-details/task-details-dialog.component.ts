import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogActions, MatDialogContent} from '@angular/material/dialog';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-task-details-dialog',
  imports: [
    MatDialogContent,
    MatDialogActions,
    CommonModule
  ],
  templateUrl: './task-details-dialog.component.html',
  styleUrl: './task-details-dialog.component.css'
})
export class TaskDetailsDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  getTotalCost(materials: any[]) {
    return materials.reduce((sum, material) => sum + material.price, 0);
  }
}

