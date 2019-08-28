import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { AtencionService } from 'src/app/services/atencion.service';
import { DataTableAtencionesDataSource } from '../atenciones-datasource';
import { MatTable, MatSort, MatPaginator } from '@angular/material';
import { CalendarioService } from 'src/app/services/calendario.service';

@Component({
  selector: 'app-atenciones-medico',
  templateUrl: './atenciones-medico.component.html',
  styleUrls: ['./atenciones-medico.component.scss']
})
export class AtencionesMedicoComponent implements AfterViewInit, OnInit {
  public userLog: any = JSON.parse(localStorage.getItem('Usuario'));
  public atencionesHistorial: any[] = null;
  public buscando = true;

  @ViewChild(MatPaginator, { static: false })
  public paginatorHist: MatPaginator;
  @ViewChild(MatSort, { static: false })
  public sortHist: MatSort;
  @ViewChild(MatTable, { static: false })
  public tableHist: MatTable<any>;
  public dataSourceHist: DataTableAtencionesDataSource;
  public displayedColumnsHist = ['fecha', 'hora', 'rut', 'paciente', 'estado'];

  constructor(
    private atencionService: AtencionService,
    private calendarioService: CalendarioService
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.atencionService.getAtencionesMedico(this.userLog.token).subscribe(
      Response => {
        this.buscando = false;
        this.atencionesHistorial = Response;
        this.dataSourceHist = new DataTableAtencionesDataSource(this.atencionesHistorial);
        this.dataSourceHist.sort = this.sortHist;
        this.dataSourceHist.paginator = this.paginatorHist;
        this.tableHist.dataSource = this.dataSourceHist;
      });
  }

  createIcsFile() {
    this.calendarioService.createEvent().subscribe(
      Response => {
        console.log(Response);
      },
      Error => {
        console.log(Error.error.Error);
      }
    );
  }

}
