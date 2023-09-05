import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { LayoutService } from 'src/app/services/layout.service';

@Component({
  selector: 'app-menuadmin',
  templateUrl: './menuadmin.component.html'
  //styleUrls: ['./menuadmin.component.css']
})
export class MenuadminComponent implements OnInit{
  model: any[] = [];

    constructor(public layoutService: LayoutService) { }

    ngOnInit() {
        this.model = [
            {
                label: 'Home',
                items: [
                    { label: 'Módulo principal', icon: 'pi pi-fw pi-home', routerLink: ['/homeadmin'] }
                ]
            },
            
            {
              label: 'Finanzas',
              icon: 'pi pi-fw pi-briefcase',
              items: [
                  
                  {
                      label: 'Movimientos',
                      icon: 'pi pi-fw pi-user',
                      items: [
                          {
                              label: 'Registrar ingresos',
                              icon: 'pi pi-fw pi-sign-in',
                              routerLink: ['']
                          },
                          {
                              label: 'Registrar gastos',
                              icon: 'pi pi-fw pi-times-circle',
                              routerLink: ['']
                          }
                      ]
                  },
                  
              ]
          },

            {
                label: 'Membresía',
                icon: 'pi pi-fw pi-briefcase',
                items: [
                    
                    {
                        label: 'Miembros',
                        icon: 'pi pi-fw pi-user',
                        items: [
                            {
                                label: 'Crear miembro',
                                icon: 'pi pi-fw pi-sign-in',
                                routerLink: ['']
                            },
                            {
                                label: 'Consultar miembro',
                                icon: 'pi pi-fw pi-times-circle',
                                routerLink: ['']
                            }
                        ]
                    },
                    
                ]
            },

            {
              label: 'Eventos',
              icon: 'pi pi-fw pi-briefcase',
              items: [
                  
                  {
                      label: 'Evento',
                      icon: 'pi pi-fw pi-user',
                      items: [
                          {
                              label: 'Crear evento',
                              icon: 'pi pi-fw pi-sign-in',
                              routerLink: ['']
                          },
                          {
                              label: 'Consultar evento',
                              icon: 'pi pi-fw pi-times-circle',
                              routerLink: ['']
                          }
                      ]
                  },
                  
              ]
          },

          {
            label: 'Administración',
            icon: 'pi pi-fw pi-briefcase',
            items: [
                
                {
                    label: 'Usuarios',
                    icon: 'pi pi-fw pi-user',
                    items: [
                        {
                            label: 'Crear usuario',
                            icon: 'pi pi-fw pi-sign-in',
                            routerLink: ['']
                        },
                        {
                            label: 'Consultar usuario',
                            icon: 'pi pi-fw pi-times-circle',
                            routerLink: ['']
                        }
                    ]
                },
                
            ]
        }
           
    
        ];
    }
}