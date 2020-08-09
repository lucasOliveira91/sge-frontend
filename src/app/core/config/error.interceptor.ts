import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS, HttpErrorResponse, HttpResponse } from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { NotificationService } from '../service/notification.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(
        public notificationService: NotificationService
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        return next.handle(req).pipe(
            catchError((error: HttpErrorResponse) => {
                console.log('---erro', error)
                let msg = error.error;
                if(error.status === 403) {
                    this.notificationService.error("Acesso não autorizado.");
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