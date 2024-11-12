import { Component, OnInit } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { Router, RouterModule } from '@angular/router';
import {MatMenuModule} from '@angular/material/menu';
import { MenuManagerService } from './services/menu-manager.service';
import { UserStoreService } from '../store/user-store.service';
import { UserModel } from '../core/models/user.model';
import { AuthService } from '../core/services/http/auth.service';
@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [ MatToolbarModule, MatButtonModule, MatIconModule, RouterModule, MatMenuModule],
  providers: [MenuManagerService, UserStoreService, AuthService],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent implements OnInit{
  user?: UserModel;

  constructor(public manager: MenuManagerService){}

  ngOnInit(): void {
    this.manager.userStoreService.store.select((state: any) => state.user.account).subscribe(user => {
      this.user = user;
    })
  }

  openLink(path: string): void {
    this.manager.router.navigateByUrl(path);
  }

  logout(): void {
    this.manager.authService.logout().subscribe({
      next: () => {
        sessionStorage.setItem('token', '');
        sessionStorage.setItem('isConnected', 'false');
        this.manager.router.navigateByUrl('/home');
        this.manager.userStoreService.resetUser();
      },
      error: () => {
        sessionStorage.setItem('token', '');
        sessionStorage.setItem('isConnected', 'false');
        this.manager.router.navigateByUrl('/home');
        this.manager.userStoreService.resetUser();
      }
    });
  }
}
