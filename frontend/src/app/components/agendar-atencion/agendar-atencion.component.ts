import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDatepickerInputEvent, MatSnackBar } from '@angular/material';
import * as moment from 'moment';
import { AtencionService } from 'src/app/services/atencion.service';
import { NgForm } from '@angular/forms';
import { PacienteService } from 'src/app/services/paciente.service';
import { Router } from '@angular/router';
import { TituloServiceService } from 'src/app/services/titulo-service.service';
import { NotificacionService } from 'src/app/services/notificacion.service';

@Component({
  selector: 'app-agendar-atencion',
  templateUrl: './agendar-atencion.component.html',
  styleUrls: ['./agendar-atencion.component.scss']
})
export class AgendarAtencionComponent implements OnInit {
  public horas: any[] = [];
  public minDate = new Date();
  public userLog: any = JSON.parse(localStorage.getItem('Usuario'));

  // variables notificacion;
  fechaFormatNow: string;
  horaFormatNow: string;
  notifTitulo: string;
  notifText: string;

  public objeto: any = {};

  @ViewChild('formulario', { static: true })
  public formulario: NgForm;
  public ingresando: boolean;

  constructor(
    private atencionService: AtencionService,
    private pacienteService: PacienteService,
    private router: Router,
    private snackBar: MatSnackBar,
    private tituloService: TituloServiceService,
    private notificacionService: NotificacionService
  ) { }

  ngOnInit() {
    this.tituloService.changeMessage('Agendar Atención');
    this.tituloService.changeParent(false);
    if (this.userLog.rol === 1) {
      this.tituloService.changeRoute('/dashboard/atenciones');
    } else {
      this.tituloService.changeRoute('/dashboard/historial');
    }
  }

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    const fecha = new Date(event.value);
    const formattedDate = moment(fecha).format('YYYY-MM-DD');

    let medicoId;
    if (this.userLog.rol === 1) {
      medicoId = this.userLog._id;
    } else {
      medicoId = this.userLog.medicoCabecera._id;
    }

    this.atencionService.getAtencionesDisponiblesPorDia(formattedDate, medicoId).subscribe(
      Response => {
        this.horas = Response;
      }
    );

  }

  public onSubmit() {
    if (this.formulario.valid) {
      if (this.userLog.rol === 1) {
        this.pacienteService.getPacientePorRut(this.objeto.rut).subscribe(
          Response => {
            const fechaFormat = moment(this.objeto.fecha).format('YYYY-MM-DD');
            this.atencionService.agendarAtencionPorDoctor(this.userLog.token, fechaFormat, this.objeto.hora, Response._id).subscribe(
              ResponseAtencion => {

                this.fechaFormatNow = moment(Date.now()).format('YYYY-MM-DD');
                this.horaFormatNow = moment(Date.now()).format('HH:mm');
                this.notifTitulo = 'Atención Agendada';
                this.notifText = 'Doctor ' + this.userLog.nombre + ' ' + this.userLog.apellido +
                  ' ha agendado hora de atención para el día ' + fechaFormat + ' a las ' + this.objeto.hora +
                  '. Revisar "mis atenciones" para más detalle.';

                this.notificacionService.createNotificacionDoctor(
                  this.notifTitulo, this.notifText, Response._id,
                  this.horaFormatNow, this.fechaFormatNow, ResponseAtencion._id).subscribe(
                    ResponseNotif => {

                    },
                    ErrorNotif => {

                    }
                  );
                this.snackBar.open('Atencion agendada correctamente', 'X', {
                  duration: 5000,
                });
                this.router.navigate(['dashboard/atenciones']);
              },
              Error => {
                this.snackBar.open(Error.error.Error, 'X', {
                  duration: 5000,
                });
              }
            );
          },
          Error => {
            this.snackBar.open(Error.error.Error, 'X', {
              duration: 5000,
            });
          }
        );
      } else if (this.userLog.rol === 2) {
        const fechaFormat = moment(this.objeto.fecha).format('YYYY-MM-DD');
        this.atencionService.agendarAtencionPorPaciente(this.userLog.token, fechaFormat, this.objeto.hora, this.userLog.medicoCabecera._id)
          .subscribe(
            Response => {
              this.fechaFormatNow = moment(Date.now()).format('YYYY-MM-DD');
              this.horaFormatNow = moment(Date.now()).format('HH:mm');
              this.notifTitulo = 'Atención Agendada';
              this.notifText = 'Paciente ' + this.userLog.nombre + ' ' + this.userLog.apellido +
                ' ha agendado hora de atención para el día ' + fechaFormat + ' a las ' + this.objeto.hora +
                '. Revisar "mis atenciones" para más detalle.';

              this.notificacionService.createNotificacionPaciente(
                this.notifTitulo, this.notifText, this.userLog.medicoCabecera._id,
                this.horaFormatNow, this.fechaFormatNow, Response._id).subscribe(
                  ResponseNotif => {

                  },
                  ErrorNotif => {

                  }
                );

              this.snackBar.open('Atencion agendada correctamente', 'X', {
                duration: 5000,
              });
              this.router.navigate(['dashboard/historial']);
            },
            Error => {
              this.snackBar.open(Error.error.Error, 'X', {
                duration: 5000,
              });
            }
          );
      }

    }

  }
}
