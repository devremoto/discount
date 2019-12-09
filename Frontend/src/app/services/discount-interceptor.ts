import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from '../models/user';

@Injectable({ providedIn: 'root' })
export class DiscountInterceptor implements HttpInterceptor {
  headers: HttpHeaders;
  logggedUser: User;
  constructor() {

    const userStr = sessionStorage.getItem('user');
    this.logggedUser = JSON.parse(userStr) as User;
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const newReq = this.setHeaders(req);
    return next.handle(newReq).pipe(
      tap(
        (event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) { }
        },
        (err: any) => {
          if (err instanceof HttpErrorResponse) {
            return this.handleRequest(err);
          }
        }
      )
    );
  }
  setHeaders(request: HttpRequest<any>) {
    const newReq = request.clone({
      setHeaders: {
        'X-USER-ID': this.logggedUser ? this.logggedUser._id : '0'
      }
    });


    return newReq;
  }

  setHeader(request: HttpRequest<any>, key: string, value: string) {
    request.headers.set(key, value);
  }

  handleRequest(error: HttpErrorResponse) {
    if (error.status === 401 || error.status === 403 || error.status === 500) {
      console.log(error);
    }

    return error;
  }
}
