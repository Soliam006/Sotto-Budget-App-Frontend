import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';
import {MatIcon} from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  imports: [
    RouterLink, MatIcon
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {

  signUpForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.signUpForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

}
