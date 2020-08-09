import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginDadosEscolaresComponent } from './login-dados-escolares/login-dados-escolares.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'login-dados-escolares',
    component: LoginDadosEscolaresComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
