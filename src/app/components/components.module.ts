import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { SlideshowComponent } from './slideshow/slideshow.component';
import { MenubarModule } from 'primeng/menubar';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    NavbarComponent,
    SlideshowComponent
  ],
  exports: [

    NavbarComponent,
    SlideshowComponent
  ],
  imports: [
    CommonModule,
    MenubarModule,
    RouterModule
  ]
})
export class ComponentsModule { }
