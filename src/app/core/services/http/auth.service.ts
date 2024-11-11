import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { LoginModel } from "../../models/login.model";
import { RegisterModel } from "../../models/register.model";
import { environment } from "../../../../environments/environment";

@Injectable()
export class AuthService {
    private url = environment.baseUrl + "/api/v1/auth";
    constructor(private http: HttpClient){}
 
    login(loginModel: LoginModel): Observable<any> {
        return this.http.post(this.url+"/login", loginModel);
    }

    logout(): Observable<any> {
        return this.http.post(this.url+"/logout", {});
    }

    register(registerModel: RegisterModel): Observable<any> {
        return this.http.post(this.url+"/register", registerModel);
    }

    isConnected(): boolean {
        return sessionStorage.getItem('isConnected') === 'true'
    }
}