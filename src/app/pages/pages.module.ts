import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { ConsultarmiembrosComponent } from './consultarmiembros/consultarmiembros.component';
import { FormsModule } from '@angular/forms';
import { ComponentsModule } from '../components/components.module';
import { LoginComponent } from './login/login.component';
import { HomeadminComponent } from './homeadmin/homeadmin.component';

@NgModule({
  declarations: [
    HomeComponent,
    ConsultarmiembrosComponent,
    LoginComponent,
    HomeadminComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ComponentsModule
  ]
})
export class PagesModule { }
