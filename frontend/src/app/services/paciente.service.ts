import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {
  // public url = 'http://localhost:4000/';
  public url = 'http://3.82.93.105:4000/';

  constructor(
    private http: HttpClient
  ) { }

  public getPacientePorRut(rut: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.get(this.url + 'public/paciente/rut/' + rut, httpOptions);
  }

  public getPacientePorId(id: string): Observable<any> {
    return this.http.get(this.url + 'public/paciente/' + id);
  }

  public createPaciente(token: string, paciente: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      })
    };

    const params = {
      rut: paciente.rut,
      correo: paciente.correo,
      telefono: paciente.telefono,
      nombre: paciente.nombre,
      apellido: paciente.apellido,
      fechaNacimiento: paciente.fechaNacimiento,
      edad: paciente.edad,
      password: paciente.password,
      cesfam: paciente.cesfam,
      enfermedadCronica: paciente.enfermedadCronica,
      direccion: paciente.direccion
    };

    return this.http.post(this.url + 'protected/paciente', params, httpOptions);
  }
}
