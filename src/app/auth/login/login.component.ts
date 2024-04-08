import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/core/service/api.service';
import { NavigationService } from 'src/app/core/service/navigation-service.service';
import { OfertasService } from 'src/app/core/service/ofertas-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';
  action: string = 'buy'; // Acción por defecto
  coin: string = 'BANK_CUP'; // Moneda por defecto
  min: string = '1';
  max: string = '5';
  ratio: number = 340;
  orden: string = 'fecha';
  response: any;
  isAuthenticated: boolean = false;
  username: any;

  constructor(
    private apiService: ApiService,
    private router: Router,
    private ofertasService: OfertasService,
    private navigationService: NavigationService
  ) {}

  ngOnInit(): void {
    console.log('LoginComponent iniciado');

    const opcionesSeleccionadas =
      this.navigationService.getOpcionesSeleccionadas();

    if (opcionesSeleccionadas) {
      this.response = opcionesSeleccionadas.login;
      this.username = opcionesSeleccionadas.username;
      //console.log(this.username);
    }
  }
  login() {
    const email = this.email;
    const password = this.password;

    if (this.response) {
      this.navigationService.changeNavigation(true);

      this.router.navigate(['opciones']);
    } else {
      this.apiService.login(email, password).subscribe(
        (response) => {
          console.log('Acceso concedido', response);
          this.response = response;
          this.isAuthenticated = true; // Actualiza el estado de autenticación
          this.ofertasService.setLogin(response);
          // servicio de navegación en un componente
          this.navigationService.changeNavigation(true);

          this.router.navigate(['opciones']);
        },
        (error) => console.log('Login error', error)
      );
    }
  }
  logout() {
    this.isAuthenticated = false;
    // Opcional: Redirige al usuario a la página de inicio de sesión
    this.navigationService.changeNavigation(true);
    this.router.navigate(['/login']);
  }
}
