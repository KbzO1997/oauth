import { HttpInterceptorFn } from '@angular/common/http';
import { HttpRequest, HttpHandlerFn, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { SessionService } from './session-service';
import { inject } from '@angular/core';

export const HttpErrorInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<any> => {
    const sessionService = inject(SessionService);
    
    return next(req).pipe(
        catchError((error: HttpErrorResponse) => {
            console.log('Error HTTP:', error.status, error.message);

            switch (error.status) {
                case 401:
                    console.log('No autorizado. Redirigiendo a login...');
                    sessionService.showDialog();
                    break;
                case 403:
                    console.log('Acceso prohibido.');
                    break;
                case 500:
                    console.log('Error del servidor.');
                    break;
                default:
                    console.log('Error desconocido.');
                    break;
            }

            return throwError(() => error);
        })
    );
};
