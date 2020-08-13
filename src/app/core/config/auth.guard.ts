import { CanLoad, Route, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Injectable } from "@angular/core";
import { UserContextService } from '../service/user-context.service';
import { RouteStateService } from '../service/route-state.service';

@Injectable()
export class AuthGuard implements CanLoad, CanActivate {

    constructor(
        private userContextService: UserContextService,
        private routeStateService: RouteStateService
    ) { }

    canLoad(route: Route): boolean {
        return this.checkAuthentication(route.path);
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        return this.checkAuthentication(route.routeConfig.path);
    }

    checkAuthentication(path: string): boolean {
        if (!this.userContextService.user$.getValue()) {
            this.routeStateService.add("Login", 'login', null, false);
        }
        return true;
    }

}