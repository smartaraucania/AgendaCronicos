import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public objeto: any = {};
  public user: any = null;

  @ViewChild('formulario', { static: true })
  public formulario: NgForm;
  public ingresando: boolean;

  public constructor(
    private authService: AuthService,
    private usuarioService: UsuarioService,
    private router: Router
  ) { }

  public ngOnInit() {
  }

  public onSubmit() {
    if (this.formulario.valid) {
      this.ingresando = true;

      this.authService.login(this.objeto.rut, this.objeto.password).subscribe(
        Response => {
          this.usuarioService.getMe(Response.token).subscribe(
            User => {
              this.user = User;
              this.ingresando = false;
              localStorage.setItem('Usuario', JSON.stringify(User));
              this.router.navigate(['dashboard']);
            }
          );
        }
      );
    }
  }
}
