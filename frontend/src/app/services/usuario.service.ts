import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public url = 'http://localhost:4000/';

  constructor(
    private http: HttpClient
  ) { }

  /**
   * Metodo que obtiene los datos del usuario logeado al sistema
   * @param token token de acceso del usuario logeado
   */
  public getMe(token: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      })
    };
    return this.http.get(this.url + 'protected/me', httpOptions);
  }

  /**
   * Metodo que permite editar los datos personales del usuario logeado
   * @param token token de acceso del usuario logeado
   * @param rol rol del usuario logeado
   * @param user datos a editar del usuario logeado
   */
  public editMe(token: string, rol: number, user: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      })
    };

    let params = {};
    if (rol === 1) {
      params = {
        correo: user.correo,
        nombre: user.nombre,
        apellido: user.apellido,
        telefono: '+56' + user.telefono
      };
    } else {
      params = {
        correo: user.correo,
        nombre: user.nombre,
        apellido: user.apellido,
        telefono: '+56' + user.telefono,
        fechaNacimiento: user.fechaNacimiento,
        direccion: user.direccion
      };
    }

    return this.http.put(this.url + 'protected/me', params, httpOptions);
  }

  /**
   * Metodo que permite al usuario logeado cambiar su contraseña
   * @param token token de acceso del usuario logeado
   * @param oldPass contraseña actual del usuario
   * @param newPass nueva contraseña del usuario
   * @param confirmPass confirmacion de nueva contraseña del usuario
   */
  public editPass(token: string, oldPass: string, newPass: string, confirmPass: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      })
    };

    const params = {
      oldPassword: oldPass,
      newPassword: newPass,
      confirmPasword: confirmPass
    };
    console.log(params);
    return this.http.put(this.url + 'protected/me/password', params, httpOptions);
  }
}
