import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginModel } from 'src/app/models/authentication/login-model';
import { UserData } from 'src/app/models/authentication/user-data';
import { LoginService } from 'src/app/services/authentication/login.service';
import { ToastService } from 'src/app/services/shared/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  model:LoginModel ={};
  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });
  constructor(
    private loginService:LoginService,
    private toastService:ToastService,
    private router:Router
  ){}
  ngOnInit(): void {
  }
  public showPassword: boolean = false;
  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
  get f(){
    return this.loginForm.controls;
  }
   onSubmit(){
    if(this.loginForm.invalid) return;
    Object.assign(this.model, this.loginForm.value);
    this.loginService.login(this.model)
    .subscribe({
      next:r=>{
        console.log(r.username)
        this.router.navigate(['/profile', r.username]);
      }
      ,error: err=>{
        this.toastService.notify('Login failed. check username & password.', 'DISMISS')
      }
    });
  }
  
  userLoggedIn(data?:UserData):void{
    console.log(data);
  }
}
