import { Injectable } from "@angular/core";
import { UserStoreService } from "../../store/user-store.service";
import { Router } from "@angular/router";
import { AuthService } from "../../core/services/http/auth.service";

@Injectable()
export class MenuManagerService {
    constructor(public userStoreService: UserStoreService,
        public router: Router,
        public authService: AuthService,
    ){}

}