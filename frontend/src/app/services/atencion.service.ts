import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AtencionService {
  // public url = 'http://localhost:4000/';
  public url = 'http://3.82.93.105:4000/';
  constructor(
    private http: HttpClient
  ) { }

  /**
   * Metodo que obtiene un usuario dependiendo de su id
   * @param token token de acceso del usuario logeado
   * @param id id del usuario a buscar
   */
  public getAtencionesUsuarioPorId(token: string, id: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      })
    };
    return this.http.get(this.url + 'protected/paciente/' + id + '/atenciones', httpOptions);
  }

  /**
   * Metodo que permite obtener una atencion especifica segun su id
   * @param token token de acceso del usuario logeado
   * @param id id de la atencion a buscar
   */
  public getAtencionPorId(token: string, id: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      })
    };
    return this.http.get(this.url + 'protected/atencion/' + id, httpOptions);
  }

  /**
   * Metodo que permite obtener todas las atenciones asignadas al medico logeado
   * @param token token de acceso del usuario logeado
   */
  public getAtencionesMedico(token: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      })
    };
    return this.http.get(this.url + 'protected/doctor/atenciones', httpOptions);
  }

  /**
   * Metodo que permite obtener todas las atenciones asignadas al paciente logeado
   * @param token token de acceso del usuario logeado
   */
  public getAtencionesPaciente(token: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      })
    };
    return this.http.get(this.url + 'protected/paciente/atenciones', httpOptions);
  }

  /**
   * Metodo que permite obtener las atenciones proximas a ser atendidas por el usuario logeado
   * @param token token de acceso del usuario logeado
   */
  public getAtencionesProximasMedico(token: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      })
    };
    return this.http.get(this.url + 'protected/doctor/atenciones/proximas', httpOptions);
  }

  /**
   * Metodo que permite cancelar una atencion agendada o reagendada
   * @param token token de acceso del usuario logeado
   * @param id id de la atencion a cancelar
   */
  public cancelarAtencion(token: string, id: string, observacionInput: string, justificacionInput: string): Observable<any> {
    const params = {
      justificacion: justificacionInput,
      observacion_justificacion: observacionInput
    };

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      })
    };
    return this.http.put(this.url + 'protected/atencion/' + id + '/cancelar', params, httpOptions);
  }

  /**
   * Metodo que permite al doctor iniciar una atencion con el estado agendada
   * @param token token de acceso del usuario logeado
   * @param id id de la atencion a iniciar
   */
  public iniciarAtencion(token: string, id: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      })
    };
    return this.http.put(this.url + 'protected/atencion/' + id + '/iniciar', null, httpOptions);
  }

  /**
   * Metodo que permite al doctor finalizar una atencion con el estado en transcurso
   * @param token token de acceso del usuario logeado
   * @param id id de la atencion en transcurso a finalizar
   * @param observacionInput observacion asociada al fin de la atencion
   */
  public finalizarAtencion(token: string, id: string, observacionInput: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      })
    };

    const params = {
      observacion: observacionInput
    };

    return this.http.put(this.url + 'protected/atencion/' + id + '/finalizar', params, httpOptions);
  }

  /**
   * Metodo que permite reagendar una atencion agendada o reagendada
   * @param token token de acceso del usuario logeado
   * @param id id de la atencion a reagendar
   * @param observacionInput observacion asociada a la reagendacion de la atencion
   * @param justificacionInput id de la justificacion asociada a la reagendacion de la atencion
   * @param fechaInput fecha de la nueva atencion
   * @param horaInput hora de la nueva atencion
   */
  public reagendarAtencion(
    token: string, id: string, observacionInput: string, justificacionInput: string,
    fechaInput: string, horaInput: string): Observable<any> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      })
    };
    const params = {
      observacion_justificacion: observacionInput,
      fecha: fechaInput,
      hora: horaInput,
      justificacion: justificacionInput
    };

    return this.http.put(this.url + 'protected/atencion/' + id + '/reagendar', params, httpOptions);
  }

  /**
   * Metodo que obtiene todas las horas disponibles para atencion de un dia en especifico
   * @param fechaConsulta dia a consultar las horas diponibles
   * @param idDoctor id del doctor al cual se consultaran las horas
   */
  public getAtencionesDisponiblesPorDia(fechaConsulta: string, idDoctor: string): Observable<any> {

    const params = {
      fecha: fechaConsulta,
      horaInicio: '10:00',
      horaFin: '20:30',
      doctor: idDoctor
    };

    return this.http.post(this.url + 'public/atencion/disponibles', params);

  }

  /**
   * Metodo que permite al doctor agendar una nueva atencion
   * @param token token de acceso del usuario logeado
   * @param fechaInput fecha de la atencion a agendar
   * @param horaInput hora de la atencion a agendar
   * @param pacienteId id del paciente al cual se le agendara una atencion
   */
  public agendarAtencionPorDoctor(token: string, fechaInput: string, horaInput: string, pacienteId: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      })
    };

    const params = {
      fecha: fechaInput,
      hora: horaInput,
      paciente: pacienteId
    };

    return this.http.post(this.url + 'protected/doctor/agendar', params, httpOptions);
  }

  /**
   * Metodo que permite al paciente agendar una nueva atencion
   * @param token token acceso usuario logeado
   * @param fechaInput fecha atencion
   * @param horaInput hora de la atencion
   * @param doctorId id del doctor que atendera la atencion
   */
  public agendarAtencionPorPaciente(token: string, fechaInput: string, horaInput: string, doctorId: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      })
    };

    const params = {
      fecha: fechaInput,
      hora: horaInput,
      doctor: doctorId
    };

    return this.http.post(this.url + 'protected/paciente/agendar', params, httpOptions);
  }

  /**
   * Metodo que permite obtener la atencion activa del paciente logeado
   * @param token token de acceso de usuario logeado
   */
  public getAtencionActivaPaciente(token: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      })
    };

    return this.http.get(this.url + 'protected/paciente/atencion/activa', httpOptions);
  }
}
