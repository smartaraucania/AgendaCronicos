import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PacienteService } from 'src/app/services/paciente.service';
import { AtencionService } from 'src/app/services/atencion.service';
import { MatPaginator, MatSort, MatTable } from '@angular/material';
import { DataTableHistorialDataSource } from './ficha-datasource';

@Component({
  selector: 'app-ficha',
  templateUrl: './ficha.component.html',
  styleUrls: ['./ficha.component.scss']
})
export class FichaComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatTable, { static: false }) table: MatTable<any>;
  dataSource: DataTableHistorialDataSource;

  public userLog: any = JSON.parse(localStorage.getItem('Usuario'));
  public paciente: any = null;
  public historial: any = null;

  displayedColumns = ['fecha', 'hora', 'estado'];

  constructor(
    private route: ActivatedRoute,
    private pacienteService: PacienteService,
    private atencionService: AtencionService
  ) { }

  ngOnInit() {
    this.pacienteService.getPacientePorId(this.route.snapshot.params.id).subscribe(
      Response => {
        this.paciente = Response;
      }
    );

  }

  ngAfterViewInit() {
    this.atencionService.getAtencionesUsuarioPorId(this.userLog.token, this.route.snapshot.params.id).subscribe(
      Response => {
        this.historial = Response;
        if (this.historial != null) {
          this.dataSource = new DataTableHistorialDataSource(this.historial);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          this.table.dataSource = this.dataSource;
        }
      }
    );
  }

}
