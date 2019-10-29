import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class GoogleService {

  public url = 'http://localhost:4000/';
  // public url = 'http://184.72.128.142:4000/';

  constructor(
    private http: HttpClient
  ) { }

  saveGoogleData(token: string, inputAccessToken: string, inputEmail: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      })
    };

    const params = {
      accessToken: inputAccessToken,
      email: inputEmail
    };

    return this.http.post(this.url + 'protected/google/save', params, httpOptions);
  }

  getCalendar(token: string, inputAccessToken: string, inputEmail: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      })
    };

    const params = {
      accessToken: inputAccessToken,
      email: inputEmail
    };
    return this.http.post(this.url + 'protected/events', params, httpOptions);
  }

  addEvent(token: string, inputAccessToken: string, inputEmail: string, inputTitulo: string, fecha: Date): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      })
    };

    const params = {
      accessToken: inputAccessToken,
      email: inputEmail,
      titulo: inputTitulo,
      inicio: fecha,
      fin: fecha
    };
    return this.http.post(this.url + 'protected/event/add', params, httpOptions);
  }

}
