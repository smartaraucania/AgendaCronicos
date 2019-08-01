import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { AtencionService } from 'src/app/services/atencion.service';
import { DataTableAtencionesDataSource } from '../atenciones-datasource';
import { MatTable, MatSort, MatPaginator } from '@angular/material';

@Component({
  selector: 'app-atenciones-medico',
  templateUrl: './atenciones-medico.component.html',
  styleUrls: ['./atenciones-medico.component.scss']
})
export class AtencionesMedicoComponent implements AfterViewInit, OnInit {
  public userLog: any = JSON.parse(localStorage.getItem('Usuario'));
  public atencionesHistorial: any[] = null;

  @ViewChild(MatPaginator, { static: false })
  public paginatorHist: MatPaginator;
  @ViewChild(MatSort, { static: false })
  public sortHist: MatSort;
  @ViewChild(MatTable, { static: false })
  public tableHist: MatTable<any>;
  public dataSourceHist: DataTableAtencionesDataSource;
  public displayedColumnsHist = ['fecha', 'hora', 'rut', 'paciente', 'estado'];

  constructor(
    private atencionService: AtencionService
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.atencionService.getAtencionesMedico(this.userLog.token).subscribe(
      Response => {
        this.atencionesHistorial = Response;
        console.log(Response);
        this.dataSourceHist = new DataTableAtencionesDataSource(this.atencionesHistorial);
        this.dataSourceHist.sort = this.sortHist;
        this.dataSourceHist.paginator = this.paginatorHist;
        console.log(this.dataSourceHist);
        this.tableHist.dataSource = this.dataSourceHist;
        console.log(this.tableHist);
      });
  }

}
