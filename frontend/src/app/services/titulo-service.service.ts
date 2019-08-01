import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TituloServiceService {

  private messageSource = new BehaviorSubject<string>('titulo');
  currentMessage = this.messageSource.asObservable();

  private routeSource = new BehaviorSubject<string>('');
  currentRoute = this.routeSource.asObservable();

  private isParentSource = new BehaviorSubject<boolean>(true);
  isParent = this.isParentSource.asObservable();

  constructor() { }

  changeMessage(message: string) {
    this.messageSource.next(message);
  }

  changeRoute(route: string) {
    this.routeSource.next(route);
  }

  changeParent(parent: boolean) {
    this.isParentSource.next(parent);
  }
}
