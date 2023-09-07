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
                label: 'Módulo Administrativo',
                items: [
                    { label: 'Home', icon: 'pi pi-fw pi-home', routerLink: ['/homeadmin'] }
                ]
            },
            
            {
              label: '',
              icon: 'pi pi-fw pi-briefcase',
              items: [
                  
                  {
                      label: 'Presupuesto',
                      icon: 'pi pi-fw pi-dollar',
                      items: [
                          {
                              label: 'Registrar ingresos',
                              icon: 'pi pi-fw pi-arrow-right',
                              routerLink: ['']
                          },
                          {
                              label: 'Registrar gastos',
                              icon: 'pi pi-fw pi-arrow-left',
                              routerLink: ['']
                          }
                      ]
                  },
                  
              ]
          },

            {
                label: '',
                icon: 'pi pi-fw pi-briefcase',
                items: [
                    
                    {
                        label: 'Miembros iglesia',
                        icon: 'pi pi-fw pi-users',
                        items: [
                            {
                                label: 'Crear miembro',
                                icon: 'pi pi-fw pi-user-plus',
                                routerLink: ['']
                            },
                            {
                                label: 'Consultar miembro',
                                icon: 'pi pi-fw pi-search',
                                routerLink: ['/miembros']
                            }
                        ]
                    },
                    
                ]
            },

            {
              label: '',
              icon: 'pi pi-fw pi-briefcase',
              items: [
                  
                  {
                      label: 'Eventos',
                      icon: 'pi pi-fw pi-calendar',
                      items: [
                          {
                              label: 'Crear evento',
                              icon: 'pi pi-fw pi-calendar-plus',
                              routerLink: ['']
                          },
                          {
                              label: 'Consultar evento',
                              icon: 'pi pi-fw pi-search',
                              routerLink: ['']
                          }
                      ]
                  },
                  
              ]
          },

          {
            label: '',
            icon: 'pi pi-fw pi-briefcase',
            items: [
                
                {
                    label: 'Administración sistema',
                    icon: 'pi pi-fw pi-cog',
                    items: [
                        {
                            label: 'Crear usuario',
                            icon: 'pi pi-fw pi-user-plus',
                            routerLink: ['']
                        },
                        {
                            label: 'Consultar usuario',
                            icon: 'pi pi-fw pi-search',
                            routerLink: ['/usuarios']
                        }
                    ]
                },
                
            ]
        }
           
    
        ];
    }
}