import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
} from '@angular/forms';

import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import { MatDividerModule} from '@angular/material/divider';
import { MatButtonModule} from '@angular/material/button';
import { AccountManagerService } from './services/account-manager.service';
import { HttpClientModule } from '@angular/common/http';
import { AppFormErrorStateMatcher } from '../core/models/form-errors-state-matcher';
import { UsersService } from '../core/services/http/users.service';
import { UserModel } from '../core/models/user.model';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule,
    MatButtonModule, MatDividerModule, MatIconModule, HttpClientModule
  ],
  providers: [AccountManagerService, UsersService],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss'
})
export class AccountComponent implements OnInit {
  accountForm = new FormGroup({});
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  firstnameFormControl = new FormControl('', [Validators.required]);
  lastnameFormControl = new FormControl('', [Validators.required]);
  addressFormControl = new FormControl('', []);
  cityFormControl = new FormControl('', []);
  postalCodeFormControl = new FormControl('', []);

  matcher = new AppFormErrorStateMatcher();

  constructor(private accountManagerService: AccountManagerService){}

  ngOnInit(): void {
    this.initForm();
    this.accountManagerService.usersService.getUsers().subscribe(data => {
      console.log(data)
    });
  }

  private initForm(): void {
    this.accountForm.addControl('email', this.emailFormControl);
    this.accountForm.addControl('firstname', this.firstnameFormControl);
    this.accountForm.addControl('lastname', this.lastnameFormControl);
    this.accountForm.addControl('address', this.addressFormControl);
    this.accountForm.addControl('city', this.cityFormControl);
    this.accountForm.addControl('postalCode', this.postalCodeFormControl);
  }

  saveChanges(): void {
    if(this.accountForm.valid){
      const value = this.accountForm.value;
      this.accountManagerService.usersService.saveUserChanges(value as UserModel).subscribe(() => {
        console.log('saved!')
      });
    }
    
  }

  cancelChanges(): void {
    alert("cancel changes")
  }
}
