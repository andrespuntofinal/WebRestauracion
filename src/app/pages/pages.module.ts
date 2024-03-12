import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { MiembrosComponent } from './miembros/miembros.component';
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
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { AvatarModule } from 'primeng/avatar';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { DialogModule } from 'primeng/dialog';
import { StyleClassModule } from 'primeng/styleclass';
import { CardModule } from 'primeng/card';
import { FileUploadModule } from 'primeng/fileupload';
import { CalendarModule } from 'primeng/calendar';
import { MultiSelectModule } from "primeng/multiselect";
import { NoimagePipe } from '../pipes/noimage.pipe';
import { DatePipe } from '@angular/common';
import { ImageModule } from 'primeng/image';
import { TabViewModule } from 'primeng/tabview';
import { MenuModule } from 'primeng/menu';
import { FinanzasComponent } from './finanzas/finanzas.component';



@NgModule({
  declarations: [
    HomeComponent,
    MiembrosComponent,
    LoginComponent,
    HomeadminComponent,
    MenuadminComponent,
    MenuitemComponent,
    UsuariosComponent,
    NoimagePipe,
    FinanzasComponent
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
    RippleModule,
    TableModule,
    ToastModule,
    ToolbarModule,
    ButtonModule,
    TooltipModule,
    AvatarModule,
    DialogModule,
    InputNumberModule,
    DropdownModule,
    InputTextareaModule,
    StyleClassModule,
    CardModule,
    FileUploadModule,
    CalendarModule,
    MultiSelectModule,
    ImageModule,
    TabViewModule,
    MenuModule
  ],
  providers: [DatePipe],
})
export class PagesModule { }
