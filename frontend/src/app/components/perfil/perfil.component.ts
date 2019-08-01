import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { MedicoService } from 'src/app/services/medico.service';
import { TituloServiceService } from 'src/app/services/titulo-service.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements AfterViewInit, OnInit {

  public userLog: any = JSON.parse(localStorage.getItem('Usuario'));

  constructor(
    private router: Router,
    private tituloService: TituloServiceService
  ) { }

  ngOnInit() {
    this.tituloService.changeMessage('Perfil');
    this.tituloService.changeParent(true);
  }

  ngAfterViewInit() {

  }

  public cerrarSesion() {
    localStorage.clear();
    this.router.navigate(['']);
  }
}
