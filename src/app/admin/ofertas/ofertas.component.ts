import { Component, OnInit } from '@angular/core';

import { OfertasService } from '../../core/service/ofertas-service.service';
import { Router } from '@angular/router';
import { NavigationService } from 'src/app/core/service/navigation-service.service';

@Component({
  selector: 'app-ofertas',
  templateUrl: './ofertas.component.html',
  styleUrls: ['./ofertas.component.css'],
})
export class OfertasComponent implements OnInit {
  offers: any[] = [];
  headerText: any;

  constructor(
    private ofertasService: OfertasService,
    private router: Router,
    private navigationService: NavigationService
  ) {
    this.ofertasService.ofertas$.subscribe((ofertas) => {
      this.offers = ofertas; // Asignar las ofertas al componente
      let isSellMajority =
        this.offers.filter((offer) => offer.type === 'sell').length >
        this.offers.length / 2;
      this.headerText = isSellMajority ? 'Pagas' : 'Recibir';
    });
  }

  ngOnInit(): void {
    console.log('OfertasComponent iniciado');
  }
  logout() {
    //this.isAuthenticated = false;
    this.navigationService.changeNavigation(true);
    this.router.navigate(['login']);
  }
  opcionesComponente() {
    this.navigationService.changeNavigation(true);
    this.router.navigate(['opciones']);
  }
}
