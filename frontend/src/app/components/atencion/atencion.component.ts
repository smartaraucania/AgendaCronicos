import { Component, OnInit, ViewChild, AfterViewInit, Inject } from '@angular/core';
import { AtencionService } from 'src/app/services/atencion.service';
import { ActivatedRoute } from '@angular/router';
import { DataTableAtencionDataSource } from './atencion-datasource';
import { MatTable, MatSort, MatPaginator, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ReagendarAtencionComponent } from '../reagendar-atencion/reagendar-atencion.component';
import * as moment from 'moment';
import { NotificacionService } from 'src/app/services/notificacion.service';
import { NgForm } from '@angular/forms';
import { JustificacionesService } from 'src/app/services/justificaciones.service';

export interface DialogData {
  observacion: string;
}

export interface DialogCancelData {
  atencion: any;
}

@Component({
  selector: 'app-finalizar-atencion-dialog',
  templateUrl: './finalizar-atencion-dialog.html',
  styleUrls: ['./atencion.component.scss']
})
export class FinalizarAtencionDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<FinalizarAtencionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  click() {

  }

}

@Component({
  selector: 'app-cancelar-atencion-dialog',
  templateUrl: './cancelar-atencion-dialog.html',
  styleUrls: ['./atencion.component.scss']
})
export class CancelarAtencionDialogComponent implements OnInit {

  public userLog: any = JSON.parse(localStorage.getItem('Usuario'));
  public justificaciones: any = [];
  public objeto: any = {};

  // variables notificacion;
  fechaFormatNow: string;
  horaFormatNow: string;
  notifTitulo: string;
  notifText: string;

  @ViewChild('formulario', { static: true })
  public formulario: NgForm;
  public ingresando: boolean;

  constructor(
    private atencionService: AtencionService,
    private notificacionService: NotificacionService,
    private justificacionService: JustificacionesService,
    public dialogRef: MatDialogRef<CancelarAtencionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogCancelData
  ) { }

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

  onNoClick(): void {
    this.dialogRef.close();
  }

  submit() {
    if (this.formulario.valid) {
      this.atencionService.cancelarAtencion(
        this.userLog.token, this.data.atencion._id, this.objeto.observacion, this.objeto.justificacion).subscribe(
          Response => {
            if (this.userLog.rol === 1) {
              this.fechaFormatNow = moment(Date.now()).format('YYYY-MM-DD');
              this.horaFormatNow = moment(Date.now()).format('HH:mm');
              this.notifTitulo = 'Atención Cancelada';
              this.notifText = 'Doctor ' + this.userLog.nombre + ' ' + this.userLog.apellido +
                ' ha cancelado la hora de atención del día ' + this.data.atencion.fecha + ' a las ' + this.data.atencion.hora +
                '. Revisar "mis atenciones" para más detalle.';

              this.notificacionService.createNotificacionDoctor(
                this.notifTitulo, this.notifText, this.data.atencion.paciente._id,
                this.horaFormatNow, this.fechaFormatNow, Response._id).subscribe(
                  ResponseNotif => {
                    console.log('notificacion creada');
                  }
                );
            } else if (this.userLog.rol === 2) {
              this.fechaFormatNow = moment(Date.now()).format('YYYY-MM-DD');
              this.horaFormatNow = moment(Date.now()).format('HH:mm');
              this.notifTitulo = 'Atención Cancelada';
              this.notifText = 'Paciente ' + this.userLog.nombre + ' ' + this.userLog.apellido +
                ' ha cancelado la hora de atención del día ' + this.data.atencion.fecha + ' a las ' + this.data.atencion.hora +
                '. Revisar "mis atenciones" para más detalle.';

              this.notificacionService.createNotificacionPaciente(
                this.notifTitulo, this.notifText, this.data.atencion.doctor._id,
                this.horaFormatNow, this.fechaFormatNow, Response._id).subscribe(
                  ResponseNotif => {
                    console.log('notificacion creada');
                  }
                );
            }
            this.dialogRef.close(true);
          },
          Error => {
            console.log(Error);
            this.dialogRef.close(true);
          }
        );
    }
  }

}

@Component({
  selector: 'app-atencion',
  templateUrl: './atencion.component.html',
  styleUrls: ['./atencion.component.scss']
})
export class AtencionComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatTable, { static: false }) table: MatTable<any>;
  dataSource: DataTableAtencionDataSource;

  displayedColumns = ['estado', 'cambiadoPor', 'horaCambio'];

  // variables notificacion;
  fechaFormatNow: string;
  horaFormatNow: string;
  notifTitulo: string;
  notifText: string;

  public userLog: any = JSON.parse(localStorage.getItem('Usuario'));
  public atencion: any = null;
  public historial: any[] = null;
  public observacion: string;

  constructor(
    private notificacionService: NotificacionService,
    private atencionService: AtencionService,
    private route: ActivatedRoute,
    public finalizarDialog: MatDialog
  ) { }

  ngOnInit() {
    this.atencionService.getAtencionPorId(this.userLog.token, this.route.snapshot.params.id).subscribe(
      Response => {
        this.atencion = Response;
      });
  }

  ngAfterViewInit() {
    this.atencionService.getAtencionPorId(this.userLog.token, this.route.snapshot.params.id).subscribe(
      Response => {
        this.historial = Response.historialAtencion;

        this.dataSource = new DataTableAtencionDataSource(this.historial);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.table.dataSource = this.dataSource;
      });
  }

  openReagendarDialog(): void {
    const dialogRef = this.finalizarDialog.open(ReagendarAtencionComponent, {
      width: 'calc(100%-10px)',
      data: {
        id_atencion: this.route.snapshot.params.id,
        token_user: this.userLog.token,
        atencion: this.atencion
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.ngOnInit();
        this.ngAfterViewInit();
      } else {
        console.log('ya valistes');
      }

    });
  }

  openDialog(): void {
    const dialogRef = this.finalizarDialog.open(FinalizarAtencionDialogComponent, {
      width: '90%',
      data: { observacion: this.observacion }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.observacion = result;

      if (this.observacion != null) {
        this.atencionService.finalizarAtencion(this.userLog.token, this.route.snapshot.params.id, this.observacion).subscribe(
          Response => {
            if (this.userLog.rol === 1) {
              this.fechaFormatNow = moment(Date.now()).format('YYYY-MM-DD');
              this.horaFormatNow = moment(Date.now()).format('HH:mm');
              this.notifTitulo = 'Atención Finalizada';
              this.notifText = 'Doctor ' + this.userLog.nombre + ' ' + this.userLog.apellido +
                ' ha finalizado la hora de atención del día ' + this.atencion.fecha + ' a las ' + this.atencion.hora +
                '. Revisar "mis atenciones" para más detalle.';

              this.notificacionService.createNotificacionDoctor(
                this.notifTitulo, this.notifText, this.atencion.paciente._id,
                this.horaFormatNow, this.fechaFormatNow, Response._id).subscribe(
                  ResponseNotif => {
                    console.log('notificacion creada');
                  }
                );
            }

            this.ngOnInit();
            this.ngAfterViewInit();
          }
        );
      } else {
        console.log('ya valistes');
      }

    });
  }

  openCancelDialog(): void {
    const dialogRef = this.finalizarDialog.open(CancelarAtencionDialogComponent, {
      width: '90%',
      data: { atencion: this.atencion }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.observacion = result;
      if (result) {
        this.ngOnInit();
        this.ngAfterViewInit();
      } else {
        console.log('ya valistes');
      }
    });

  }

  iniciarAtencion() {
    this.atencionService.iniciarAtencion(this.userLog.token, this.route.snapshot.params.id).subscribe(
      Response => {
        if (this.userLog.rol === 1) {
          this.fechaFormatNow = moment(Date.now()).format('YYYY-MM-DD');
          this.horaFormatNow = moment(Date.now()).format('HH:mm');
          this.notifTitulo = 'Atención Iniciada';
          this.notifText = 'Doctor ' + this.userLog.nombre + ' ' + this.userLog.apellido +
            ' ha iniciado la hora de atención del día ' + this.atencion.fecha + ' a las ' + this.atencion.hora +
            '. Revisar "mis atenciones" para más detalle.';

          this.notificacionService.createNotificacionDoctor(
            this.notifTitulo, this.notifText, this.atencion.paciente._id,
            this.horaFormatNow, this.fechaFormatNow, Response._id).subscribe(
              ResponseNotif => {
                console.log('notificacion creada');
              }
            );
        }

        this.ngOnInit();
        this.ngAfterViewInit();
      }
    );
  }

}


