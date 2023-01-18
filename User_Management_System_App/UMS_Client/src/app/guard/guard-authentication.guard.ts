import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginStatusService } from '../services/authentication/login-status.service';
import { ToastService } from '../services/shared/toast.service';

@Injectable({
  providedIn: 'root'
})
export class GuardAuthenticationGuard implements CanActivate {
  constructor(
    private toastService:ToastService,
    private loginStatusService:LoginStatusService,
    private router:Router
  ){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(!this.loginStatusService.isLoggedIn){
        this.toastService.notify("You must login to access.", "DISMISS");
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
      }
      else{
        return true;
      }
  }
}
