import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDatepickerInputEvent } from '@angular/material';
import { AtencionService } from 'src/app/services/atencion.service';
import * as moment from 'moment';
import { NgForm } from '@angular/forms';
import { JustificacionesService } from 'src/app/services/justificaciones.service';

export interface DialogReagendarData {
  id_atencion: string;
  token_user: string;
}

@Component({
  selector: 'app-reagendar-atencion',
  templateUrl: './reagendar-atencion.component.html',
  styleUrls: ['./reagendar-atencion.component.scss']
})
export class ReagendarAtencionComponent implements OnInit {
  public horas: any[] = [];
  public minDate = new Date();
  public userLog: any = JSON.parse(localStorage.getItem('Usuario'));

  public justificaciones: any = [];

  public objeto: any = {};

  @ViewChild('formulario', { static: true })
  public formulario: NgForm;
  public ingresando: boolean;

  constructor(
    private atencionService: AtencionService,
    private justificacionService: JustificacionesService,
    public dialogRef: MatDialogRef<ReagendarAtencionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogReagendarData
  ) { }

  onNoClick(): void {
    this.dialogRef.close(false);
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

  ngOnInit() {
    if (this.userLog.rol === 1) {
      this.justificacionService.getJustificacionesDoctor().subscribe(
        Response => {
          this.justificaciones = Response;
        }
      );
    } else if (this.userLog.rol === 2) {
      this.justificacionService.getJustificacionesPaciente().subscribe(
        Response => {
          this.justificaciones = Response;
        }
      );
    }
  }

  onSubmit() {
    if (this.formulario.valid) {
      const fechaFormat = moment(this.objeto.fecha).format('YYYY-MM-DD');
      this.atencionService.reagendarAtencion(this.data.token_user, this.data.id_atencion,
        this.objeto.observacion, this.objeto.justificacion, fechaFormat, this.objeto.hora)
        .subscribe(
          Response => {
            this.dialogRef.close(true);
          },
          Error => {
            this.dialogRef.close(true);
          }
        );
    }
  }

}
