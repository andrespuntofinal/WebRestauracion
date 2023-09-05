import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { ConsultarmiembrosComponent } from './consultarmiembros/consultarmiembros.component';
import { FormsModule } from '@angular/forms';
import { ComponentsModule } from '../components/components.module';
import { LoginComponent } from './login/login.component';
import { HomeadminComponent } from './homeadmin/homeadmin.component';
import { MenuadminComponent } from './menuadmin/menuadmin.component';
import { PanelMenuModule } from 'primeng/panelmenu';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenuitemComponent } from './menuitem/menuitem.component';
import { InputTextModule } from 'primeng/inputtext';
import { SidebarModule } from 'primeng/sidebar';
import { BadgeModule } from 'primeng/badge';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputSwitchModule } from 'primeng/inputswitch';
import { RippleModule } from 'primeng/ripple';

@NgModule({
  declarations: [
    HomeComponent,
    ConsultarmiembrosComponent,
    LoginComponent,
    HomeadminComponent,
    MenuadminComponent,
    MenuitemComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ComponentsModule,
    PanelMenuModule,
    BrowserAnimationsModule,
    InputTextModule,
    SidebarModule,
    BadgeModule,
    RadioButtonModule,
    InputSwitchModule,
    RippleModule
  ]
})
export class PagesModule { }
