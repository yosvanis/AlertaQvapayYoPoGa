import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//import { OfertasComponent } from './ofertas/ofertas.component';
import { LoginComponent } from './auth/login/login.component';
import { OfertasComponent } from './admin/ofertas/ofertas.component';
import { OpcionesComponent } from './admin/opciones/opciones.component';
import { AuthModule } from './auth/auth.module';
import { MenuValidGuard } from './core/guards/menu-valid.guard';

const routes: Routes = [
  {
    path: 'ofertas',
    component: OfertasComponent,
    canActivate: [MenuValidGuard],
  },
  {
    path: 'opciones',
    component: OpcionesComponent,
    canActivate: [MenuValidGuard],
  },

  { path: '**', component: LoginComponent, canActivate: [MenuValidGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
