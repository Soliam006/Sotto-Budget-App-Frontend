import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  FormsModule, NgForm,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import {ErrorStateMatcher, provideNativeDateAdapter} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {CommonModule, DatePipe,} from '@angular/common';
import {BehaviorSubject} from 'rxjs';
import {MatInputModule} from '@angular/material/input';
import {User} from '../../../../shared/models/user';

/** @title Date range picker forms integration */
@Component({
  selector: 'profile-edit-section',
  templateUrl: 'profile-edit-section.component.html',
  styleUrls: ['profile-edit-section.component.css'],
  providers: [provideNativeDateAdapter()],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    DatePipe,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileEditSectionComponent{
  @Input() range!: FormGroup;
  @Input() dateRanges: { start: Date, end: Date }[] = [];
  @Input() save!: BehaviorSubject<boolean>
  @Input() user!: User |null;
  @Output() cancel = new EventEmitter<void>();

  userInfoForm : FormGroup;
  email: string = "Bla@as.com";

  constructor(
    private fb: FormBuilder,
  ) {
    this.userInfoForm = this.fb.group({
      username: [this.user? this.user.username: '', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      }
    )
  }

  addDateRange(){
    if(this.range.valid) {
      const startDate = this.range.value.start;
      const endDate = this.range.value.end;
      if (startDate && endDate) {
        this.dateRanges.push({ start: startDate, end: endDate });
        this.range.reset();
      }
    }
  }

  removeDateRange(index: number) {
    this.dateRanges.splice(index, 1);
  }

  cancelar(){
    this.cancel.emit();
  }
  saveData(){
    console.log(this.dateRanges);
    this.save.next(true);
  }
}
