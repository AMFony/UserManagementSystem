import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginStatusService } from '../services/authentication/login-status.service';

@Injectable()
export class HttpInterceptorInterceptor implements HttpInterceptor {
  constructor(
    private loginSatatusService:LoginStatusService
  ) {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if(this.loginSatatusService.isLoggedIn){
      let token = this.loginSatatusService.token;
      if(token){
        req = req.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`
          }
        })
      }
    }
    return next.handle(req);
  }
}
