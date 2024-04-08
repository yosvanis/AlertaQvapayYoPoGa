import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// app component
import { LoginComponent } from './login/login.component';

const authRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'logout',
    redirectTo: 'login',
  },
];

@NgModule({
  imports: [RouterModule.forChild(authRoutes)],
  exports: [RouterModule],
  declarations: [],
})
export class AuthRoutingModule {}
