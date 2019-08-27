import { Component, OnInit, AfterViewInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { TituloServiceService } from '../services/titulo-service.service';
import { MenuController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss']
})
export class MainNavComponent implements AfterViewInit, OnInit {

  public userLog: object = JSON.parse(localStorage.getItem('Usuario'));
  public titulo: string;
  public rutaParent: string;
  public parent: boolean;

  public title: string;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(
    private nav: NavController,
    private menu: MenuController,
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    private tituloService: TituloServiceService
  ) { }

  ngOnInit() {
    this.tituloService.currentMessage.subscribe(message => this.titulo = message);
    this.tituloService.isParent.subscribe(isparent => this.parent = isparent);
    this.tituloService.currentRoute.subscribe(parentroute => this.rutaParent = parentroute);
  }

  ngAfterViewInit() {
    console.log(this.parent);
  }

  public cerrarSesion() {
    localStorage.clear();
    this.router.navigate(['']);
  }

  public backButton(route) {
    console.log(route);
    // this.router.navigate([route]);
    this.nav.navigateForward(route);
  }

  openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

  openEnd() {
    this.menu.open('end');
  }

  openCustom() {
    this.menu.enable(true, 'custom');
    this.menu.open('custom');
  }

}
