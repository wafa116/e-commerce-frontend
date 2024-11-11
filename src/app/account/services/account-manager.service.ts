import { Injectable } from "@angular/core";
import { UsersService } from "../../core/services/http/users.service";
import { ActivatedRoute } from "@angular/router";

@Injectable()
export class AccountManagerService {
    constructor(public usersService: UsersService,
        public activatedRoute: ActivatedRoute
    ){}
}