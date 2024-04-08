import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/core/service/api.service';
import { NavigationService } from 'src/app/core/service/navigation-service.service';
import { OfertasService } from 'src/app/core/service/ofertas-service.service';

@Component({
  selector: 'app-opciones',
  templateUrl: './opciones.component.html',
  styleUrls: ['./opciones.component.css'],
})
export class OpcionesComponent implements OnInit {
  email: string = '';
  password: string = '';
  action: string = 'buy'; // Acción por defecto
  coin: string = 'BANK_CUP'; // Moneda por defecto
  min: string = '1';
  max: string = '5';
  ratio: number = 340;
  orden: string = 'fecha';
  response: any;
  isAuthenticated: boolean = true;
  login: any;
  username: any;
  constructor(
    private apiService: ApiService,
    private router: Router,
    private ofertasService: OfertasService,
    private navigationService: NavigationService
  ) {
    this.ofertasService.login$.subscribe((login) => {
      this.login = login;
    });
  }

  ngOnInit(): void {
    console.log('OpcionesComponent iniciado');

    const opcionesSeleccionadas =
      this.navigationService.getOpcionesSeleccionadas();

    if (opcionesSeleccionadas) {
      this.login = opcionesSeleccionadas.login;
      this.coin = opcionesSeleccionadas.coin;
      this.min = opcionesSeleccionadas.min;
      this.max = opcionesSeleccionadas.max;
      this.ratio = opcionesSeleccionadas.ratio;
      this.action = opcionesSeleccionadas.action;
      this.orden = opcionesSeleccionadas.orden;
      this.username = opcionesSeleccionadas.username;
    } else {
      this.navigationService.setOpcionesSeleccionadas({
        login: this.login,
        coin: this.coin,
        min: this.min,
        max: this.max,
        ratio: this.ratio,
        action: this.action,
        orden: this.orden,
        username: this.username,
      });
    }
  }
  onSubmit() {
    if (!this.isAuthenticated) {
      console.log('Por favor, inicie sesión primero');
      return;
    }
    // Llama al método getOffers con los valores del formulario
    this.getOffers(
      this.login,
      this.coin,
      this.min,
      this.max,
      this.ratio,
      this.action,
      this.orden,
      this.login.me.username
    );
  }
  getButtonText(): string {
    let text = '';
    if (this.action === 'buy') {
      text = `Aplica a esta oferta si quieres adquirir ${this.coin} y pagas con USD Qvapay`;
    } else if (this.action === 'sell') {
      text = `Aplica a esta oferta si quieres adquirir USD en Qvapay y pagas con ${this.coin}`;
    }
    return text;
  }
  getOffers(
    login: any,
    coin: string,
    min: string,
    max: string,
    ratio: number,
    action: string,
    orden: string,
    username: string
  ) {
    this.navigationService.setOpcionesSeleccionadas({
      login,
      coin,
      min,
      max,
      ratio,
      action,
      orden,
      username,
    });

    this.apiService.getOffers(login, action, coin, min, max).subscribe({
      next: (ofertas) => {
        let filteredOffers = ofertas.data
          .filter(
            (offer: any) =>
              offer.status === 'open' &&
              (action === 'buy'
                ? +offer.receive / +offer.amount >= ratio
                : +offer.receive / +offer.amount <= ratio)
          )
          .map((offer: any) => ({
            Ratio: +offer.receive / +offer.amount,
            name: offer.owner.name + ': ' + offer.owner.average_rating,
            type: offer.type,
            coin: offer.coin,
            amount: offer.amount,
            receive: offer.receive,
            status: offer.status,
            message: offer.message,
            ultimaFecha: offer.updated_at,
          }));

        if (orden == 'fecha') {
          filteredOffers = filteredOffers.sort(
            (a: any, b: any) =>
              new Date(b.updated_at).getTime() -
              new Date(a.updated_at).getTime()
          );
          console.log(
            'Ofertas ordenadas por fechas (más reciente primero)',
            filteredOffers
          );
          this.ofertasService.setOfertas(filteredOffers); // Almacenar las ofertas en el servicio
          this.navigationService.changeNavigation(true);
          this.router.navigate(['ofertas']); // Navegar a la página de ofertas sin parámetros de consulta
        } else {
          filteredOffers = filteredOffers.sort(
            (a: any, b: any) => b.Ratio - a.Ratio
          );
          console.log('Ofertas ordenadas por mejor oferta', filteredOffers);
          this.ofertasService.setOfertas(filteredOffers); // Almacenar las ofertas en el servicio
          this.navigationService.changeNavigation(true);
          this.router.navigate(['/ofertas']); // Navegar a la página de ofertas sin parámetros de consulta
        }
      },
      error: (error) => console.log('Error getting offers', error),
    });
  }
  logout() {
    // this.isAuthenticated = false;
    this.navigationService.changeNavigation(true);
    this.router.navigate(['login']);
  }
}
