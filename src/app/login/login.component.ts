import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AppFormErrorStateMatcher } from '../core/models/form-errors-state-matcher';
import { LoginManagerService } from './services/login-manager.service';
import { LoginModel } from '../core/models/login.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../core/services/http/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { UserStoreService } from '../store/user-store.service';
import { UsersService } from '../core/services/http/users.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, 
    ReactiveFormsModule, HttpClientModule, MatButtonModule],
  providers: [AuthService, LoginManagerService, UserStoreService, UsersService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm = new FormGroup({});
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  passwordFormControl = new FormControl('', [Validators.required]);
  errorMessage = '';

  matcher = new AppFormErrorStateMatcher();

  constructor(private loginManagerService: LoginManagerService){}

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.loginForm.addControl('email', this.emailFormControl);
    this.loginForm.addControl('password', this.passwordFormControl);
  }

  login(): void {
    this.errorMessage = '';
    if(this.loginForm.valid){
      const loginModel: LoginModel = this.loginForm.value  as LoginModel;
      this.loginManagerService.authService.login(loginModel).subscribe({
        next: res => {
          sessionStorage.setItem('token', res.token)
          sessionStorage.setItem('isConnected', 'true')
          this.loginManagerService.usersService.getUser(loginModel.email)
          .subscribe({
            next: user => {
              this.loginManagerService.userStoreService.setUser(user);
              this.loginManagerService.router.navigateByUrl('/home')
            },
            error: error => {
              
              this.errorMessage = error && error.error && error.error.message || 'Unknown error while loading user!';
            }
          })
        },
        error: error => {
          sessionStorage.setItem('token', '')
          sessionStorage.setItem('isConnected', 'false')
          this.errorMessage = error && error.error && error.error.message || 'Unknown error while login!';
        }
      });
    }
    
  }
}
