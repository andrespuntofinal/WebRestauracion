import { Component, OnInit  } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  items: MenuItem[] | undefined;

  ngOnInit() {
      this.items = [
          {
              label: 'Nosotros',
              icon: 'pi pi-fw pi-eject',
              routerLink: '/miembros'

          },
          {
              label: 'Ministerios',
              icon: 'pi pi-fw pi-users'

          },
          {
              label: 'Poderosito',
              icon: 'pi pi-fw pi-discord'
       
          },
          {
              label: 'Eventos',
              icon: 'pi pi-fw pi-calendar'
 
          },
          {
              label: 'Admin',
              icon: 'pi pi-fw pi-cog',
              items: [
                {
                    label: 'Bookmark',
                    icon: 'pi pi-fw pi-bookmark'
                },
                {
                    label: 'Video',
                    icon: 'pi pi-fw pi-video'
                }
            ]
          }
      ];
  }
}

