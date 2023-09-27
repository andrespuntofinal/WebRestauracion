import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { SlideshowComponent } from './slideshow/slideshow.component';
import { MenubarModule } from 'primeng/menubar';
import { MenuModule } from 'primeng/menu';
import { RouterModule } from '@angular/router';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';


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
    RouterModule,
    AvatarModule,
    AvatarGroupModule,
    MenuModule
  ]
})
export class ComponentsModule { }
