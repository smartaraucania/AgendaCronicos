import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { MedicoService } from 'src/app/services/medico.service';
import { TituloServiceService } from 'src/app/services/titulo-service.service';
import { GoogleService } from 'src/app/services/google.service';

import { AuthService, SocialUser } from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';
import { MatSnackBar } from '@angular/material';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements AfterViewInit, OnInit {

  public userLog: any = JSON.parse(localStorage.getItem('Usuario'));

  private user: SocialUser;
  private loggedIn: boolean;
  private pressButton = false;

  constructor(
    private router: Router,
    private tituloService: TituloServiceService,
    private googleService: GoogleService,
    private authService: AuthService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.tituloService.changeMessage('Perfil');
    this.tituloService.changeParent(true);

    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
      if (this.pressButton) {
        this.googleService.saveGoogleData(this.userLog.token, this.user.authToken, this.user.email).subscribe(
          Response => {

            localStorage.setItem('Usuario', JSON.stringify(Response));
            this.snackBar.open('Sincronización con google realizada correctamente', 'X', {
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
    });
  }

  ngAfterViewInit() {

  }

  signInWithGoogle(): void {
    this.pressButton = true;
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  public cerrarSesion() {
    localStorage.clear();
    this.router.navigate(['']);
  }
}
