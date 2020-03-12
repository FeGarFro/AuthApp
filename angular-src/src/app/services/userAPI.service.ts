import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http'
import { catchError, retry, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {

  authToken: any;
  user: any;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  }

  getUsers(){
    const url = 'http://localhost:3000/API/users'
    return this.http.get(url, this.httpOptions).pipe(
      retry(3),
      catchError((err) => { throw err }))
  }

  loginUser(userCred){

    const url = 'http://localhost:3000/API/users/auth'
    return this.http.post(url, userCred, this.httpOptions)
      .pipe(retry(3))
  }

  logoutUser(){
    localStorage.clear();
  }

  storageUser(token, user){
    localStorage.setItem("id_token", token)
    localStorage.setItem("user", JSON.stringify(user))
    this.authToken = token;
    this.user = user;
  }

  registerUser(user){

    const url = 'http://localhost:3000/API/users/register'
    return this.http.post(url, user, this.httpOptions).pipe(
      retry(3)
      )
    
  }

  constructor(private http: HttpClient) { }
}
