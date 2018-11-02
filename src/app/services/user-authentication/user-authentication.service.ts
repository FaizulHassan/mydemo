import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserAuthenticationService {

  userSignupApi = `localhost:3200/user/signup`;
  userSigninApi = `localhost:3200/user/signin`;
  getUserEmailApi = `localhost:3200/user/get-user-email`;
  public userAuthUserName: string

  constructor(
    private _http: HttpClient
  ) { }

  userSignup(inputData: any): Observable<any> {
    return this._http.post(this.userSignupApi, inputData);
  }

  getUserMailId(inputData: any): Observable<any> {
    return this._http.post(this.getUserEmailApi, inputData);
  }

  userSignin(inputData: any): Observable<any> {    
    return this._http.post(this.userSigninApi, inputData);    
  }

  setJWTToken(token: string) {
    sessionStorage.setItem('token', token);
  }

  removeJWTToken() {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('userMailID');
  }

  getUserEmailFromJWTToken() {
    var token = sessionStorage.getItem('token');
    if (token) {
      var payloadFromJWT = atob(token.split('.')[1]);
      var parseToken = JSON.parse(payloadFromJWT);

      /* Setting email address in localstorage */
      var getEmail = parseToken.email;
      sessionStorage.setItem('userMailID', getEmail);
      
      /* Setting username for globally */
      this.userAuthUserName = parseToken.username;

      return parseToken;
    } else {
      console.log('JWT Token isn\'t provided');
      return null;
    }
  }

  getPayloadFromJWTToken() {
    var token = sessionStorage.getItem('token');
    if (token) {
      var payloadFromJWT = atob(token.split('.')[1]);
      return JSON.parse(payloadFromJWT);
    } else {
      console.log('JWT Token isn\'t provided');
      return null;
    }
  }

  isLoggedIn() {
    var JWTPayload = this.getPayloadFromJWTToken();
    if (JWTPayload) {
      return JWTPayload.exp > Date.now() / 1000;
    } else {
      console.log('Jwt token unavailable or is expired');
      return false;
    }
  }
}
