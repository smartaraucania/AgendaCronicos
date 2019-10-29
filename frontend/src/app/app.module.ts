import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatRippleModule } from '@angular/material/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MainNavComponent } from './main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatSidenavModule, MatListModule, MatPaginatorModule, MatSortModule } from '@angular/material';
import { NotificacionesComponent } from './components/notificaciones/notificaciones.component';
import { FichasComponent } from './components/fichas/fichas.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { HistorialComponent } from './components/historial/historial.component';
import { FichaComponent } from './components/ficha/ficha.component';
import {
  AtencionComponent, FinalizarAtencionDialogComponent,
  CancelarAtencionDialogComponent
} from './components/atencion/atencion.component';
import { DataTableExampleComponent } from './data-table-example/data-table-example.component';
import { AtencionesComponent } from './components/atenciones/atenciones.component';
import { AgendarAtencionComponent } from './components/agendar-atencion/agendar-atencion.component';
import { AgregarPacienteComponent } from './components/agregar-paciente/agregar-paciente.component';
import { ProximasAtencionesComponent } from './components/atenciones/proximas-atenciones/proximas-atenciones.component';
import { AtencionesMedicoComponent } from './components/atenciones/atenciones-medico/atenciones-medico.component';
import { EditarPerfilComponent } from './components/editar-perfil/editar-perfil.component';
import { NoticiasComponent } from './components/noticias/noticias.component';
import { ReagendarAtencionComponent } from './components/reagendar-atencion/reagendar-atencion.component';

import { SocialLoginModule, AuthServiceConfig, LoginOpt } from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';


const googleLoginOptions: LoginOpt = {
  scope: 'profile email https://www.googleapis.com/auth/calendar'
};

const config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider('1087058763481-3ff95t8d3kreenr2huvl072tlcu2qa9i.apps.googleusercontent.com', googleLoginOptions)
  }
]);

export function provideConfig() {
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    MainNavComponent,
    NotificacionesComponent,
    FichasComponent,
    PerfilComponent,
    HistorialComponent,
    FichaComponent,
    AtencionComponent,
    DataTableExampleComponent,
    AtencionesComponent,
    FinalizarAtencionDialogComponent,
    AgendarAtencionComponent,
    AgregarPacienteComponent,
    ProximasAtencionesComponent,
    AtencionesMedicoComponent,
    EditarPerfilComponent,
    NoticiasComponent,
    ReagendarAtencionComponent,
    CancelarAtencionDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatIconModule,
    LayoutModule,
    MatSidenavModule,
    MatListModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatTooltipModule,
    FlexLayoutModule,
    MatDialogModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRippleModule,
    MatSnackBarModule,
    MatExpansionModule,
    IonicModule,
    SocialLoginModule
  ],
  entryComponents: [
    FinalizarAtencionDialogComponent,
    ReagendarAtencionComponent,
    CancelarAtencionDialogComponent
  ],
  providers: [
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
