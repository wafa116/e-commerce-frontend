import { Injectable } from "@angular/core";
import { AuthService } from "../../core/services/http/auth.service";
import { Router } from "@angular/router";

@Injectable()
export class RegisterManagerService {
    constructor(public authService: AuthService,
        public router: Router
    ){}
}