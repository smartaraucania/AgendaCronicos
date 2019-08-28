import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificacionService {
  // public url = 'http://localhost:4000/';
  public url = 'http://3.82.93.105:4000/';

  constructor(
    private http: HttpClient
  ) { }

  public getNotificacionesDoctor(token: string): Observable<any> {
    const params = {
      desde: '2019-07-02T10:10:00.000Z'
    };

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      })
    };

    return this.http.post(this.url + 'protected/notificaciones/doctor', params, httpOptions);
  }

  public getNotificacionesPaciente(token: string): Observable<any> {
    const params = {
      desde: '2019-07-02T10:10:00.000Z'
    };

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      })
    };

    return this.http.post(this.url + 'protected/notificaciones/paciente', params, httpOptions);
  }

  public createNotificacionPaciente(
    tituloInput: string, textoInput: string, doctorId: string, horaInput: string, fechaInput: string, atencionInput: any): Observable<any> {

    const params = {
      titulo: tituloInput,
      texto: textoInput,
      doctor: doctorId,
      hora: horaInput,
      fecha: fechaInput,
      atencion: atencionInput
    };

    return this.http.post(this.url + 'public/notificacion', params);
  }

  public createNotificacionDoctor(
    tituloInput: string, textoInput: string, pacienteId: string,
    horaInput: string, fechaInput: string, atencionInput: any): Observable<any> {

    const params = {
      titulo: tituloInput,
      texto: textoInput,
      paciente: pacienteId,
      hora: horaInput,
      fecha: fechaInput,
      atencion: atencionInput
    };

    return this.http.post(this.url + 'public/notificacion', params);
  }
}
