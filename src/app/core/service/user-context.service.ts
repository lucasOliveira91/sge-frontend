import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { SessionService } from './session.service';
import { RouteStateService } from './route-state.service';

const defaultUser = null;

@Injectable({
    providedIn: 'root',
})
export class UserContextService {
    public user$ = new BehaviorSubject(defaultUser);

    constructor(
        private sessionService: SessionService,
        private routeStateService: RouteStateService
    ) {
        var data = this.sessionService.getItem("currentUser");
        if (data != null) {
            this.user$.next(data);
        }
    }

    public setUser(user: any) {
        this.sessionService.setItem("currentUser", user);
        this.user$.next(user);
    }

    public logout() {
        this.sessionService.removeItem("currentUser");
        this.user$.next(defaultUser);
        this.routeStateService.add("Login", 'login', null, false);
    }

}