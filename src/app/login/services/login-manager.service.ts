import { Injectable } from "@angular/core";
import { AuthService } from "../../core/services/http/auth.service";
import { UserStoreService } from "../../store/user-store.service";
import { UsersService } from "../../core/services/http/users.service";
import { Router } from "@angular/router";

@Injectable()
export class LoginManagerService {
    constructor(public authService: AuthService,
        public userStoreService: UserStoreService,
        public usersService: UsersService,
        public router: Router
    ){}
}