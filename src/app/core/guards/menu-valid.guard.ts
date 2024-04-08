// menu-valid.guard.ts
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { NavigationService } from '../service/navigation-service.service';

@Injectable({
  providedIn: 'root',
})
export class MenuValidGuard implements CanActivate {
  constructor(
    private navigationService: NavigationService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    // Suscríbete al observable del servicio de navegación para verificar el estado
    this.navigationService.navigationChanged.subscribe((status) => {
      if (status) {
        // Si la navegación fue iniciada por una redirección dentro de la aplicación, permite el acceso
        return true;
      } else {
        // Si la navegación fue iniciada por el usuario escribiendo la URL, redirige a una página de error o inicio de sesión
        this.router.navigate(['/login']); // Ajusta la ruta según sea necesario
        return false;
      }
    });

    // Cambia el estado de navegación a verdadero para indicar que la navegación fue iniciada por una redirección dentro de la aplicación
    this.navigationService.changeNavigation(true);

    return true;
  }
}
