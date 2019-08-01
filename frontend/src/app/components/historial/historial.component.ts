import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { TituloServiceService } from 'src/app/services/titulo-service.service';
import { AtencionService } from 'src/app/services/atencion.service';
import { MatPaginator, MatSort, MatTable } from '@angular/material';
import { DataTableHistorialDataSource } from './historial-datasource';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.scss']
})
export class HistorialComponent implements AfterViewInit, OnInit {
  public userLog: any = JSON.parse(localStorage.getItem('Usuario'));
  public atencionActiva: any;

  panelOpenState = false;

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatTable, { static: false }) table: MatTable<any>;
  dataSource: DataTableHistorialDataSource;

  public historial: any = null;

  displayedColumns = ['fecha', 'hora', 'estado'];

  constructor(
    private tituloService: TituloServiceService,
    private atencionService: AtencionService
  ) { }

  ngOnInit() {
    this.tituloService.changeMessage('Mis Atenciones');
    this.tituloService.changeParent(true);

    this.atencionService.getAtencionActivaPaciente(this.userLog.token).subscribe(
      Response => {
        this.atencionActiva = Response;
      },
      Error => {

      }
    );
  }

  ngAfterViewInit() {
    this.atencionService.getAtencionesPaciente(this.userLog.token).subscribe(
      Response => {
        this.historial = Response;
        this.dataSource = new DataTableHistorialDataSource(this.historial);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.table.dataSource = this.dataSource;
      });
  }

}
