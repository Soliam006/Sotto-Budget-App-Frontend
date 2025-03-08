import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-follow-dialog',
  imports: [MatDialogModule, CommonModule],
  templateUrl: './follow-dialog.component.html',
  styleUrl: './follow-dialog.component.css'
})
export class FollowDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<FollowDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { list: any[]; title: string }
  ) {}

  closeDialog(): void {
    this.dialogRef.close();
  }
}
