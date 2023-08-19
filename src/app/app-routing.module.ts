import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ConsultarmiembrosComponent } from './pages/consultarmiembros/consultarmiembros.component';

const routes: Routes = [

  {
    path: 'home',
    component: HomeComponent
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
