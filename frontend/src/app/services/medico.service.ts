import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


export interface DataTableFichaItem {
  _id: string;
  rut: string;
  correo: string;
  nombre: string;
  apellido: string;
  fechaNacimiento: string;
  edad: string;
  medicoCabecera: any;
  enfermedadCronica: any;
  cesfam: any;
  direccion: string;
  telefono: string;
  rol: string;
}

@Injectable({
  providedIn: 'root'
})

export class MedicoService {
  public url = 'http://localhost:4000/';
  // public url = 'http://184.72.128.142:4000/';

  constructor(
    private http: HttpClient
  ) { }

  public getPacientesDoctor(token: string, id: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      })
    };
    return this.http.get(this.url + 'protected/doctor/' + id + '/pacientes', httpOptions);
  }

}
