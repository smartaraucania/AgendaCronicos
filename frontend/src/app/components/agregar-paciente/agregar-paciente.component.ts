import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormControl, Validators } from '@angular/forms';
import { CesfamService } from 'src/app/services/cesfam.service';
import { EnfermedadCronicaService } from 'src/app/services/enfermedad-cronica.service';
import * as moment from 'moment';
import { AtencionService } from 'src/app/services/atencion.service';
import { PacienteService } from 'src/app/services/paciente.service';
import { TituloServiceService } from 'src/app/services/titulo-service.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-agregar-paciente',
  templateUrl: './agregar-paciente.component.html',
  styleUrls: ['./agregar-paciente.component.scss']
})
export class AgregarPacienteComponent implements OnInit {
  public cesfams: any = [];
  public cronicas: any = [];

  public objeto: any = {};
  public userLog: any = JSON.parse(localStorage.getItem('Usuario'));

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  @ViewChild('formulario', { static: true })
  public formulario: NgForm;
  public ingresando: boolean;

  constructor(
    public cesfamService: CesfamService,
    public cronicaService: EnfermedadCronicaService,
    public pacienteService: PacienteService,
    public tituloService: TituloServiceService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.tituloService.changeMessage('Agregar Paciente');
    this.tituloService.changeParent(false);
    this.tituloService.changeRoute('/dashboard/fichas');

    this.cesfamService.getAllCesfam().subscribe(
      Response => {
        this.cesfams = Response;
      }
    );

    this.cronicaService.getAllCronicas().subscribe(
      Response => {
        this.cronicas = Response;
      }
    );
  }

  public onSubmit() {
    if (this.formulario.valid) {
      const formattedDate = moment(this.objeto.fechaNacimiento).format('YYYY-MM-DD');
      const fechaActual = moment(Date.now());

      this.objeto.edad = fechaActual.diff(formattedDate, 'years');
      this.objeto.fechaNacimiento = formattedDate;

      const rutClean = this.objeto.rut.replace(/[.-]/g, '');
      this.objeto.password = rutClean.substring(rutClean.length - 4);

      this.pacienteService.createPaciente(this.userLog.token, this.objeto).subscribe(
        Response => {
          console.log(Response);
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
