// src/app/interceptors/auth.interceptor.ts

import { Injectable, inject } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Retrieve the token from session storage
    const token = sessionStorage.getItem('token');

    // Clone the request and add the Authorization header if a token exists
    const authReq = token
      ? req.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`
          }
        })
      : req;

    // Pass the modified request to the next handler
    return next.handle(authReq);
  }
}
