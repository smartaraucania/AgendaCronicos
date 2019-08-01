import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatPaginator, MatSort, MatTable, MatSnackBar } from '@angular/material';
import { DataTableFichaDataSource } from './fichas-datasource';
import { MedicoService } from 'src/app/services/medico.service';
import { PacienteService } from 'src/app/services/paciente.service';
import { TituloServiceService } from 'src/app/services/titulo-service.service';

@Component({
  selector: 'app-fichas',
  templateUrl: './fichas.component.html',
  styleUrls: ['./fichas.component.scss']
})
export class FichasComponent implements AfterViewInit, OnInit {
  public userLog: any = JSON.parse(localStorage.getItem('Usuario'));
  public pacientes: any[] = [];
  public rut: string;

  @ViewChild('buscarporrut', { static: true })
  public buscarporrut: NgForm;

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatTable, { static: false }) table: MatTable<any>;
  dataSource: DataTableFichaDataSource;

  displayedColumns = ['rut', 'nombre', 'cesfam'];

  public constructor(
    private medicoService: MedicoService,
    private pacienteService: PacienteService,
    private tituloService: TituloServiceService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.tituloService.changeMessage('Mis Pacientes');
    this.tituloService.changeParent(true);
  }

  ngAfterViewInit() {
    this.medicoService.getPacientesDoctor(this.userLog.token, this.userLog._id).subscribe(
      Response => {
        // this.pacientes = Response;
        this.dataSource = new DataTableFichaDataSource(Response);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.table.dataSource = this.dataSource;

      },
      Error => {
        console.log(Error);
        this.snackBar.open(Error.error.Error, 'X', {
          duration: 5000,
        });
      }
    );
  }


  public onSubmit() {
    if (this.buscarporrut.valid) {
      this.pacientes = [];
      this.pacienteService.getPacientePorRut(this.rut).subscribe(
        Response => {
          if (Response != null) {
            this.pacientes.push(Response);
          }
          this.dataSource = new DataTableFichaDataSource(this.pacientes);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          this.table.dataSource = this.dataSource;
        },
        Error => {
          this.snackBar.open(Error.error.Error, 'X', {
            duration: 5000,
          });
        }
      );
    }
  }


}
