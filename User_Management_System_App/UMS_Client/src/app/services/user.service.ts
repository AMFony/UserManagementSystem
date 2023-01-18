import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { User } from '../models/authentication/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http:HttpClient) { }
  getAll():Observable<User[]>{
    return this.http.get<User[]>(`http://localhost:5000/api/Users`);
  }
  get(id:number):Observable<User>{
    return this.http.get<User>(`http://localhost:5000/api/Users/${id}`)
  }
  getByName(name:string):Observable<User>{
    return this.http.get<User>(`http://localhost:5000/api/Users/name/${name}`)
  }
  checkUsername(username:string):Observable<boolean>{
    return this.http.get<boolean>(`http://localhost:5000/api/Account/name/exists/${username}`)
  }
  checkEmail(email:string):Observable<boolean>{
    return this.http.get<boolean>(`http://localhost:5000/api/Account/email/exists/${email}`)
  }
  register(data:User):Observable<any>{
    return this.http.post<any>(`http://localhost:5000/api/Account/register`, data);
  }
  uploadImage(username: string, f: File): Observable<{imgname:string}> {
    const formData = new FormData();
    formData.append('pic', f);
    return this.http.post<{imgname:string}>(`http://localhost:5000/api/users/upload/${username}`, formData);
  }
  update(user:User):Observable<any>{
    return this.http.put<any>(`http://localhost:5000/api/Users/${user.userid}`, user)
  }
}
