import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-follow-dialog',
  imports: [MatDialogModule, CommonModule, ReactiveFormsModule, FormsModule, MatIconModule],
  templateUrl: './follow-dialog.component.html',
  styleUrl: './follow-dialog.component.css'
})
export class FollowDialogComponent {
  searchTerm: string = '';

  filteredList() {
    return this.data.list.filter(user =>
      user.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  constructor(
    public dialogRef: MatDialogRef<FollowDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { list: any[]; title: string }
  ) {}

  closeDialog(): void {
    this.dialogRef.close();
  }
}
