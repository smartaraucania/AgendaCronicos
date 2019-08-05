import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator, MatSort, MatTable } from '@angular/material';
import { DataTableAtencionesDataSource } from '../atenciones-datasource';
import { AtencionService } from 'src/app/services/atencion.service';

@Component({
  selector: 'app-proximas-atenciones',
  templateUrl: './proximas-atenciones.component.html',
  styleUrls: ['./proximas-atenciones.component.scss']
})
export class ProximasAtencionesComponent implements AfterViewInit, OnInit {
  public userLog: any = JSON.parse(localStorage.getItem('Usuario'));
  public atenciones: any[] = null;
  public buscando = true;

  @ViewChild(MatPaginator, { static: false })
  public paginator: MatPaginator;
  @ViewChild(MatSort, { static: false })
  public sort: MatSort;
  @ViewChild(MatTable, { static: false })
  public table: MatTable<any>;
  public dataSource: DataTableAtencionesDataSource;
  public displayedColumns = ['fecha', 'hora', 'rut', 'paciente', 'estado'];

  constructor(
    private atencionService: AtencionService
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.atencionService.getAtencionesProximasMedico(this.userLog.token).subscribe(
      Proximas => {
        this.buscando = false;
        this.atenciones = Proximas;
        this.dataSource = new DataTableAtencionesDataSource(this.atenciones);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.table.dataSource = this.dataSource;
      });
  }

}
