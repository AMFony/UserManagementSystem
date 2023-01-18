import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(
    private snackBar:MatSnackBar
  ) { }
  notify(message:string, action:string){
    let config:MatSnackBarConfig ={
      duration:3000
    }
    this.snackBar.open(message, action, config);
  }
}

