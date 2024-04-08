import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OpcionesComponent } from './opciones/opciones.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { OfertasComponent } from './ofertas/ofertas.component';

@NgModule({
  declarations: [OfertasComponent, OpcionesComponent],
  imports: [CommonModule, RouterModule, FormsModule],
})
export class AdminModule {}
