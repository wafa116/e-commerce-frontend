import { Injectable } from "@angular/core";
import { UsersService } from "../../core/services/http/users.service";

@Injectable()
export class AccountManagerService {
    constructor(public usersService: UsersService){}
}