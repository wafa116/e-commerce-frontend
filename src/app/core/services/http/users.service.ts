import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { UserModel } from "../../models/user.model";
import { environment } from "../../../../environments/environment";

@Injectable()
export class UsersService {
    private url = environment.baseUrl + "/api/v1/users";
    constructor(private http: HttpClient){}
 
    getUser(email: string): Observable<UserModel>{
        return this.http.get<UserModel>(this.url+`/${email}`);
    }

    saveUserChanges(user: UserModel): Observable<any> {
        return this.http.post(this.url+"/", user);
    }
}