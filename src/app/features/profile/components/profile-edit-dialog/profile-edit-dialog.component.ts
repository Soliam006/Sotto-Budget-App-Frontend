import {Component, Inject, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {CommonModule} from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-profile-edit-dialog',
  imports: [
    CommonModule,
    MatFormFieldModule, MatDatepickerModule, ReactiveFormsModule, FormsModule, MatIconModule
  ],
  templateUrl: './profile-edit-dialog.component.html',
  styleUrl: './profile-edit-dialog.component.css',
  encapsulation: ViewEncapsulation.None
})
export class ProfileEditDialogComponent {

  profileForm: FormGroup;
  availableDateRanges: { form: FormGroup }[] = [];

  addDateRange(): void {
    this.availableDateRanges.push({
      form: this.fb.group({
        from: [null, Validators.required],
        to: [null, Validators.required]
      })
    });
  }

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ProfileEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.profileForm =this.fb.group({
      name: [data.name, Validators.required],
      phone: [data.phone, [Validators.required, Validators.pattern(/^\d{9,15}$/)]],
      budgetLimit: [data.budgetLimit, [Validators.required, Validators.min(0)]],
    });


    this.data.availableDates.forEach((dateRange: any) => {
      this.availableDateRanges.push({
        form: this.fb.group({
          start: [dateRange.start, Validators.required],
          end: [dateRange.end, Validators.required]
        })
      });
    });
  }

  removeDateRange(index: number): void {
    this.availableDateRanges.splice(index, 1);
  }

  save(): void {
    if (this.profileForm.valid) {
      this.dialogRef.close({
        ...this.profileForm.value,
        availableDates: this.availableDateRanges.map(dateRange => dateRange.form.value)
      });
    }
  }

  close(): void {
    this.dialogRef.close();
  }

}
