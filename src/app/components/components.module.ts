import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { MenubarModule } from 'primeng/menubar';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    NavbarComponent
  ],
  exports: [

    NavbarComponent
  ],
  imports: [
    CommonModule,
    MenubarModule,
    RouterModule
  ]
})
export class ComponentsModule { }
