import { Component, OnInit } from '@angular/core';
import { NotificacionService } from 'src/app/services/notificacion.service';
import { TituloServiceService } from 'src/app/services/titulo-service.service';

@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.component.html',
  styleUrls: ['./notificaciones.component.scss']
})
export class NotificacionesComponent implements OnInit {
  public userLog: any = JSON.parse(localStorage.getItem('Usuario'));
  public notificaciones: any = [];
  constructor(
    private notificacionService: NotificacionService,
    private tituloService: TituloServiceService
  ) { }

  ngOnInit() {
    this.tituloService.changeParent(true);
    this.tituloService.changeMessage('Notificaciones');

    if (this.userLog.rol === 2) {
      this.notificacionService.getNotificacionesPaciente(this.userLog.token).subscribe(
        Response => {
          console.log(Response);
          this.notificaciones = Response;
        }
      );
    } else if (this.userLog.rol === 1) {
      this.notificacionService.getNotificacionesDoctor(this.userLog.token).subscribe(
        Response => {
          console.log(Response);
          this.notificaciones = Response;
        }
      );
    }
  }

}
