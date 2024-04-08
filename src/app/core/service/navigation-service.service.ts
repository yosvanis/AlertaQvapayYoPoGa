// navigation.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  private navigationSource = new BehaviorSubject<boolean>(false);
  navigationChanged = this.navigationSource.asObservable();

  // Estado para almacenar las opciones seleccionadas
  private opcionesSeleccionadasSource = new BehaviorSubject<any>(null);
  opcionesSeleccionadasChanged =
    this.opcionesSeleccionadasSource.asObservable();

  changeNavigation(status: boolean) {
    this.navigationSource.next(status);
  }

  // Métodos para manejar las opciones seleccionadas
  setOpcionesSeleccionadas(opciones: any) {
    this.opcionesSeleccionadasSource.next(opciones);
  }

  getOpcionesSeleccionadas() {
    return this.opcionesSeleccionadasSource.getValue();
  }
}
