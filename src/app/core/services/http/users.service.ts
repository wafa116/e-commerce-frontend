import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { UserModel } from "../../models/user.model";

@Injectable()
export class UsersService {
    private apiPath = "http://localhost:3000/api/v1";
    constructor(private http: HttpClient){}
 
    getUser(email: string): Observable<UserModel>{
        return this.http.get<UserModel>(this.apiPath+`/users/${email}`);
    }

    saveUserChanges(user: UserModel): Observable<any> {
        return this.http.post(this.apiPath+"/users", user);
    }
}