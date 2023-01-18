import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { BehaviorSubject, catchError, map, switchMap, throwError } from 'rxjs';
import { UserData } from 'src/app/models/authentication/user-data';
import { LoginModel } from 'src/app/models/authentication/login-model';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private currentUserSubject: BehaviorSubject<UserData | null>;
  @Output() loginEvent: EventEmitter<string> = new EventEmitter<string>();
  constructor(private http: HttpClient) {
    let data = sessionStorage.getItem('user-data');
    this.currentUserSubject = new BehaviorSubject<UserData | null>( data ? JSON.parse(data) : null);
  }
  login(data: LoginModel) {
    let noTokenHeader = { headers: new HttpHeaders({ 'notoken': 'no token' }) }
    return this.http.post<UserData>(`http://localhost:5000/api/Account/Login`, data).pipe(
      map((r) => {
         this.save(r);
        this.currentUserSubject.next(r);
        return r;
      }),
      catchError((err, caught)=>{
        this.currentUserSubject.next(null);
          return throwError(()=> console.log(err));
      })
    );  
  }
  get currentUser(){
    return this.currentUserSubject.value;
  }
  logout(){
    sessionStorage.removeItem("user-data");
    this.currentUserSubject.next(null);
    this.loginEvent.emit('logout');
  }
  save(data:UserData){
    sessionStorage.setItem("user-data", JSON.stringify(data));
  }
}
