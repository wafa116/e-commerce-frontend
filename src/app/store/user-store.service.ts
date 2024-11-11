import { Injectable } from "@angular/core";
import { Observable, ReplaySubject } from "rxjs";
import { UserModel } from "../core/models/user.model";
import { Store } from '@ngrx/store';
import { setUser, resetUser } from "./user.actions";

@Injectable()
export class UserStoreService {
    user$ = new ReplaySubject<UserModel|undefined>();
    constructor(public store: Store){
        
    }

    setUser(user: UserModel): void {
        this.store.dispatch(setUser({user}));
    }

    loadUser(): Observable<UserModel|undefined> {
        return this.user$;
    }

    resetUser(): void {
     this.store.dispatch(resetUser());
    }
}