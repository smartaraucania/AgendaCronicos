import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {
  public url = 'http://localhost:4000/';
  // public url = 'http://184.72.128.142:4000/';

  constructor(
    private http: HttpClient
  ) { }

  getNoticiasByTwitter(): Observable<any> {
    return this.http.get(this.url + 'public/noticias');
  }

}
