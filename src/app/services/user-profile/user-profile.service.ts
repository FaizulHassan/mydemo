import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  userProfileApi = `localhost:3200/user/get-data`;

  constructor(
    private _http: HttpClient
  ) { }

  getUserProfile(queryParams): Observable<any> {
    return this._http.get(`${this.userProfileApi}?${queryParams}`, {
      headers: new HttpHeaders({
        Authorization: `Auth-token ${sessionStorage.getItem('token')}`
      })
    });
  }
}
