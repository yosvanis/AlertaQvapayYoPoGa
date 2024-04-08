// ofertas.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OfertasService {
  private ofertasSource = new BehaviorSubject<any[]>([]);
  ofertas$ = this.ofertasSource.asObservable();

  private loginSource = new BehaviorSubject<any[]>([]);
  login$ = this.loginSource.asObservable();

  constructor() {}

  setOfertas(ofertas: any[]) {
    this.ofertasSource.next(ofertas);
  }
  setLogin(login: any[]) {
    this.loginSource.next(login);
  }
}
