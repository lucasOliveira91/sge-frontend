import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AdminComponent } from './shared/layout/admin/admin.component';
import { AuthGuard } from './core/config/auth.guard';


const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        component: HomeComponent, 
        canLoad: [AuthGuard], canActivate: [AuthGuard]
      }
    ]
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/autenticação/autenticacao.module').then(module => module.AuthenticationModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
