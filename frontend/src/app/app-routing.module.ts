import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { NotificacionesComponent } from './components/notificaciones/notificaciones.component';
import { FichasComponent } from './components/fichas/fichas.component';
import { MainNavComponent } from './main-nav/main-nav.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { HistorialComponent } from './components/historial/historial.component';
import { FichaComponent } from './components/ficha/ficha.component';
import { AtencionComponent } from './components/atencion/atencion.component';
import { AtencionesComponent } from './components/atenciones/atenciones.component';
import { AgendarAtencionComponent } from './components/agendar-atencion/agendar-atencion.component';
import { AgregarPacienteComponent } from './components/agregar-paciente/agregar-paciente.component';
import { EditarPerfilComponent } from './components/editar-perfil/editar-perfil.component';
import { NoticiasComponent } from './components/noticias/noticias.component';


const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'dashboard',
    component: MainNavComponent,
    children: [
      {
        path: '',
        component: NotificacionesComponent
      },
      {
        path: 'fichas',
        component: FichasComponent
      },
      {
        path: 'ficha/:id',
        component: FichaComponent
      },
      {
        path: 'atencion/:id',
        component: AtencionComponent
      },
      {
        path: 'perfil',
        component: PerfilComponent
      },
      {
        path: 'editarPerfil',
        component: EditarPerfilComponent
      },
      {
        path: 'historial',
        component: HistorialComponent
      },
      {
        path: 'atenciones',
        component: AtencionesComponent
      },
      {
        path: 'agendar',
        component: AgendarAtencionComponent
      },
      {
        path: 'paciente',
        component: AgregarPacienteComponent
      },
      {
        path: 'noticias',
        component: NoticiasComponent
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
