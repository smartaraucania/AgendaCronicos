import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { TituloServiceService } from '../services/titulo-service.service';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss']
})
export class MainNavComponent implements OnInit {

  public userLog: object = JSON.parse(localStorage.getItem('Usuario'));
  public titulo: string;
  public rutaParent: string;
  public parent: boolean;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    private tituloService: TituloServiceService
  ) { }

  ngOnInit() {
    this.tituloService.currentMessage.subscribe(message => this.titulo = message);
    this.tituloService.isParent.subscribe(isparent => this.parent = isparent);
    this.tituloService.currentRoute.subscribe(parentroute => this.rutaParent = parentroute);
  }

  public cerrarSesion() {
    localStorage.clear();
    this.router.navigate(['']);
  }

  public backButton(route) {
    console.log(route);
    this.router.navigate([route]);
  }
}
