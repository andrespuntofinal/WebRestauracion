import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { ConsultarmiembrosComponent } from './consultarmiembros/consultarmiembros.component';


@NgModule({
  declarations: [
    HomeComponent,
    ConsultarmiembrosComponent
  ],
  imports: [
    CommonModule
  ]
})
export class PagesModule { }
