import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
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
    component: MiembrosComponent
  },
  {
    path: 'usuarios',
    component: UsuariosComponent
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
