import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class AuthService {

  constructor(
    private http: HttpClient
  ) { }


  public login(rutInput: string, passwordInput: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post('http://localhost:4000/auth/login', {
      rut: rutInput,
      password: passwordInput
    }, httpOptions);
  }
}
