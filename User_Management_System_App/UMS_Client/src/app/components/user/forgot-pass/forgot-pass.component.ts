import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot-pass.component.html',
  styleUrls: ['./forgot-pass.component.css']
})
export class ForgotPassComponent {
  constructor(private router:Router){
  }
  isSent=false;
  email:string ='';
  onSubmit(f:NgForm){
    if(f.invalid) return;
    this.isSent=true;
    setTimeout(()=>{
      this.router.navigateByUrl("/login");
    }, 10000);
  }
}
