import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { FinanzasComponent } from './pages/finanzas/finanzas.component';
import { AportesComponent } from './pages/aportes/aportes.component';
import { MiembrosComponent } from './pages/miembros/miembros.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeadminComponent } from './pages/homeadmin/homeadmin.component';
import { AuthGuard } from './guards/auth.guard';
import { NavbarComponent } from './components/navbar/navbar.component';

const routes: Routes = [

  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'login', 
    component: LoginComponent
  },
  {
    path: 'homeadmin',
   canActivate: [ AuthGuard ],
    component: HomeadminComponent
  },
  {
    path: 'miembro/:id',
    component: MiembrosComponent
  },
  {
    path: 'miembros', 
    canActivate: [ AuthGuard ],
    component: MiembrosComponent
  },
  {
    path: 'usuarios',
    canActivate: [ AuthGuard ],
    component: UsuariosComponent
  },
  {
    path: 'finanzas',
    canActivate: [ AuthGuard ],
    component: FinanzasComponent
  },
  {
    path: 'aportes',
    canActivate: [ AuthGuard ],
    component: AportesComponent
  },
  {
    path: 'navbar',
    component: NavbarComponent
  },
  {
    path: '**',
    redirectTo: '/home'
  }

]



@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot( routes )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
