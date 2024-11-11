import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { LoginModel } from "../../models/login.model";
import { RegisterModel } from "../../models/register.model";

@Injectable()
export class AuthService {
    private apiPath = "http://localhost:3000/api/v1";
    constructor(private http: HttpClient){}
 
    login(loginModel: LoginModel): Observable<any> {
        return this.http.post(this.apiPath+"/auth/login", loginModel);
    }

    logout(): Observable<any> {
        return this.http.post(this.apiPath+"/auth/logout", {});
    }

    register(registerModel: RegisterModel): Observable<any> {
        return this.http.post(this.apiPath+"/auth/register", registerModel);
    }

    isConnected(): boolean {
        return sessionStorage.getItem('isConnected') === 'true'
    }
}