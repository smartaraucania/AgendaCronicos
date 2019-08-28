import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CalendarioService {
  // public url = 'http://localhost:4000/';
  public url = 'http://3.82.93.105:4000/';

  constructor(
    private http: HttpClient
  ) { }

  createEvent(): Observable<any> {
    const params = {
      horaAtencion: '2019-08-28T12:00:00Z',
      pacienteNombre: 'Carlos Valenzuela',
      cesfamNombre: 'Amanecer',
      cesfamLat: -10,
      cesfamLong: 10
    };

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post(this.url + 'public/calendario/evento', params, httpOptions);
  }
}
