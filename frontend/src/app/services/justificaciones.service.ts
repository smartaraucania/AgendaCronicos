import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JustificacionesService {
  // public url = 'http://localhost:4000/';
  public url = 'http://3.82.93.105:4000/';

  constructor(
    private http: HttpClient
  ) { }

  getJustificacionesDoctor(): Observable<any> {
    return this.http.get(this.url + 'public/justificaciones/medico');
  }

  getJustificacionesPaciente(): Observable<any> {
    return this.http.get(this.url + 'public/justificaciones/paciente');
  }
}
