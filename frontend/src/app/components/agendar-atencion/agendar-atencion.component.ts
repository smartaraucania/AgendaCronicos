import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDatepickerInputEvent, MatSnackBar } from '@angular/material';
import * as moment from 'moment';
import { AtencionService } from 'src/app/services/atencion.service';
import { NgForm } from '@angular/forms';
import { PacienteService } from 'src/app/services/paciente.service';
import { Router } from '@angular/router';
import { TituloServiceService } from 'src/app/services/titulo-service.service';

@Component({
  selector: 'app-agendar-atencion',
  templateUrl: './agendar-atencion.component.html',
  styleUrls: ['./agendar-atencion.component.scss']
})
export class AgendarAtencionComponent implements OnInit {
  public horas: any[] = [];
  public minDate = new Date();
  public userLog: any = JSON.parse(localStorage.getItem('Usuario'));

  public objeto: any = {};

  @ViewChild('formulario', { static: true })
  public formulario: NgForm;
  public ingresando: boolean;

  constructor(
    private atencionService: AtencionService,
    private pacienteService: PacienteService,
    private router: Router,
    private snackBar: MatSnackBar,
    private tituloService: TituloServiceService
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
            if (Response.status === 200) {
              const fechaFormat = moment(this.objeto.fecha).format('YYYY-MM-DD');
              this.atencionService.agendarAtencionPorDoctor(this.userLog.token, fechaFormat, this.objeto.hora, Response.body._id).subscribe(
                ResponseAtencion => {
                  this.snackBar.open('Atencion agendada correctamente', 'X', {
                    duration: 5000,
                  });
                  this.router.navigate(['dashboard/atenciones']);
                }
              );
            }
          }
        );
      } else if (this.userLog.rol === 2) {
        const fechaFormat = moment(this.objeto.fecha).format('YYYY-MM-DD');
        this.atencionService.agendarAtencionPorPaciente(this.userLog.token, fechaFormat, this.objeto.hora, this.userLog.medicoCabecera._id)
          .subscribe(
            Response => {
              this.snackBar.open('Atencion agendada correctamente', 'X', {
                duration: 5000,
              });
              this.router.navigate(['dashboard/historial']);
            }
          );
      }

    }
  }
}
