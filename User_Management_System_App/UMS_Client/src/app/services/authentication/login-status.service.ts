import { Injectable } from '@angular/core';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class LoginStatusService {

  constructor(
    private loginService:LoginService
  ) { }
  get isLoggedIn(){
    return this.loginService.currentUser !=null;
  }
  get username(){
    return this.loginService.currentUser?.username;
  }
  get token(){
    return this.loginService.currentUser?.token;
  }
  logout(){
    this.loginService.logout();
  }
}
