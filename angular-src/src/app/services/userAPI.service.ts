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
      'Content-Type':  'application/json',
      'Authorization': 'my-auth-token'
    })
  }

  loginUser(userCred){

    const url = 'http://localhost:3000/API/users/auth'
    return this.http.post(url, userCred, this.httpOptions)
      .pipe(retry(3))
  }

  getProfile(){
    const url = 'http://localhost:3000/API/users/profile'
    let newHeaders = this.httpOptions.headers.set("Authorization", this.authToken).set("Content-Type", 'aplication/json')
    return this.http.get(url, {headers: newHeaders})
      .pipe(retry(3))
  }

  logoutUser(){
    if(localStorage){localStorage.clear();}
    else{console.log("localStorage is empty!")}
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
