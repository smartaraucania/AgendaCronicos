import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EnfermedadCronicaService {
  // public url = 'http://localhost:4000/';
  public url = 'http://54.85.148.66:4000/';

  constructor(
    private http: HttpClient
  ) { }

  getAllCronicas(): Observable<any> {
    return this.http.get(this.url + 'public/cronicas');
  }
}
