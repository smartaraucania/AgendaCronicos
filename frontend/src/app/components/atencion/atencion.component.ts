import { Component, OnInit, ViewChild, AfterViewInit, Inject } from '@angular/core';
import { AtencionService } from 'src/app/services/atencion.service';
import { ActivatedRoute } from '@angular/router';
import { DataTableAtencionDataSource } from './atencion-datasource';
import { MatTable, MatSort, MatPaginator, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ReagendarAtencionComponent } from '../reagendar-atencion/reagendar-atencion.component';

export interface DialogData {
  observacion: string;
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

  public userLog: any = JSON.parse(localStorage.getItem('Usuario'));
  public atencion: any = null;
  public historial: any[] = null;
  public observacion: string;

  constructor(
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
      width: '90%',
      data: {
        id_atencion: this.route.snapshot.params.id,
        token_user: this.userLog.token
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.ngOnInit();
        this.ngAfterViewInit();
      } else {
        console.log("ya valistes");
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
            this.ngOnInit();
            this.ngAfterViewInit();
          }
        );
      } else {
        console.log("ya valistes");
      }
      console.log(result);
    });
  }

  cancelarAtencion() {
    this.atencionService.cancelarAtencion(this.userLog.token, this.route.snapshot.params.id).subscribe(
      Response => {
        this.ngOnInit();
        this.ngAfterViewInit();
      }
    );
  }

  iniciarAtencion() {
    this.atencionService.iniciarAtencion(this.userLog.token, this.route.snapshot.params.id).subscribe(
      Response => {
        this.ngOnInit();
        this.ngAfterViewInit();
      }
    );
  }

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
