import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator, MatSort, MatTable, MatDatepickerInputEvent } from '@angular/material';
import { DataTableAtencionesDataSource } from './atenciones-datasource';
import { AtencionService } from 'src/app/services/atencion.service';
import { MainNavComponent } from 'src/app/main-nav/main-nav.component';
import { TituloServiceService } from 'src/app/services/titulo-service.service';


@Component({
  selector: 'app-atenciones',
  templateUrl: './atenciones.component.html',
  styleUrls: ['./atenciones.component.scss']
})
export class AtencionesComponent implements AfterViewInit, OnInit {

  panelOpenState = false;

  constructor(
    private tituloService: TituloServiceService
  ) { }

  ngOnInit() {
    this.tituloService.changeMessage('Mis Atenciones');
    this.tituloService.changeParent(true);
  }

  ngAfterViewInit() {
  }

}
