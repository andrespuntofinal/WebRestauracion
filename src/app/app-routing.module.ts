import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ConsultarmiembrosComponent } from './pages/consultarmiembros/consultarmiembros.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeadminComponent } from './pages/homeadmin/homeadmin.component';
import { AuthGuard } from './guards/auth.guard';

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
    path: 'Homeadmin',
    canActivate: [ AuthGuard ],
    component: HomeadminComponent
  },
  {
    path: 'miembro/:id',
    component: ConsultarmiembrosComponent
  },
  {
    path: 'miembros',
    component: ConsultarmiembrosComponent
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
