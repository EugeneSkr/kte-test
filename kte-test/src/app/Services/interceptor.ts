import { HTTP_INTERCEPTORS, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { LoadingService } from './loading.service';


@Injectable()
export class Interceptor implements HttpInterceptor {
    constructor(private loadingService:LoadingService) { }
    refresh: boolean = false;
    private totalRequests = 0;

    //перехватчик запросов
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.totalRequests++;
        this.loadingService.setLoading(true);

        return next.handle(request).pipe(
            catchError((error) => {
                return throwError(() => error);
            }),
            finalize(() => {
                this.totalRequests--;
                if(this.totalRequests === 0) {
                  this.loadingService.setLoading(false);
                }
              }),
        )
    }
}

export const InterceptorProviders = [
  {provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true}
];