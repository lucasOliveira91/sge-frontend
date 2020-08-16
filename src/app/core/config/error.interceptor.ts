import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS, HttpErrorResponse, HttpResponse } from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { NotificationService } from '../service/notification.service';
import { UserContextService } from '../service/user-context.service';
import { RouteStateService } from '../service/route-state.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(
        public notificationService: NotificationService,
        private userContextService: UserContextService,
        private routeStateService: RouteStateService
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        return next.handle(req).pipe(
            catchError((error: HttpErrorResponse) => {
                console.log('---erro', error)
                let msg = error.error.message;
                if(error.status === 403) {
                    this.notificationService.error("Acesso não autorizado.");
                    this.userContextService.logout();
                    this.routeStateService.add("Login", 'login', null, false);
                    return throwError(error.error);
                }
                if(error.status === 401) {
                    this.notificationService.error("Credenciais inválidas.");
                    return throwError(error.error);
                }
                this.notificationService.error(msg);
                return throwError(error.error);
            }));
    }
}

export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true
}