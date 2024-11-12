import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../core/services/http/auth.service';
import { AppFormErrorStateMatcher } from '../core/models/form-errors-state-matcher';
import { RegisterModel } from '../core/models/register.model';
import { RegisterManagerService } from './services/register-manager.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, 
    ReactiveFormsModule, HttpClientModule, MatButtonModule, RouterModule],
  providers: [AuthService, RegisterManagerService],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit{
  registerForm = new FormGroup({});
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  passwordFormControl = new FormControl('', [Validators.required]);
  confirmPasswordFormControl = new FormControl('', [Validators.required]);
  errorMessage = '';

  matcher = new AppFormErrorStateMatcher();

  constructor(private manager: RegisterManagerService){}

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.registerForm.addControl('email', this.emailFormControl);
    this.registerForm.addControl('password', this.passwordFormControl);
    this.registerForm.addControl('confirmPassword', this.confirmPasswordFormControl);
  }

  register(): void {
    this.errorMessage = '';
    
    if(this.registerForm.valid){
      const value = this.registerForm.value;
      this.manager.authService.register(value as RegisterModel).subscribe({
        next: (register: any) => {
          this.manager.router.navigate(['/account', register.email]);
        },
        error: error => {
          this.errorMessage = error && error.error && error.error.message || 'Unknown error while registring!';
        }
      });
    }
    
  }
}
