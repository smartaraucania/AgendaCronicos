import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, NgForm, Validators } from '@angular/forms';
import { TituloServiceService } from 'src/app/services/titulo-service.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.component.html',
  styleUrls: ['./editar-perfil.component.scss']
})
export class EditarPerfilComponent implements OnInit {
  public objeto: any = {};
  public password: any = {};

  public userLog: any = JSON.parse(localStorage.getItem('Usuario'));

  panelOpenState = false;
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  @ViewChild('formulario', { static: true })
  public formulario: NgForm;
  public ingresando: boolean;

  @ViewChild('formularioPass', { static: true })
  public formularioPass: NgForm;

  constructor(
    private tituloService: TituloServiceService,
    private usuarioService: UsuarioService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.tituloService.changeMessage('Editar Perfil');
    this.tituloService.changeParent(false);
    this.tituloService.changeRoute('/dashboard/perfil');

    this.objeto = this.userLog;
    this.objeto.telefono = this.objeto.telefono.substring(3);
  }

  public onSubmit() {
    if (this.formulario.valid) {
      this.usuarioService.editMe(this.userLog.token, this.userLog.rol, this.objeto).subscribe(
        Response => {
          this.usuarioService.getMe(Response.token).subscribe(
            User => {
              localStorage.setItem('Usuario', JSON.stringify(User));
              this.snackBar.open('Perfil editado correctamente', 'X', {
                duration: 5000,
              });
            }
          );
        }
      );
    }
  }

  public cambiarPass() {
    if (this.formularioPass.valid) {
      this.usuarioService.editPass(this.userLog.token, this.password.antigua, this.password.nueva, this.password.confirmacion).subscribe(
        Response => {
          this.snackBar.open('Contraseña editada correctamente', 'X', {
            duration: 5000,
          });
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
