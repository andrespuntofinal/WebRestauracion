import { Component, OnInit, Input  } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  items: MenuItem[] | undefined;
  nombreusr: string;
  control: string;

  
  constructor( public auth: AuthService,
    private router: Router ) {
        console.log("xxxxxxxxxxxcccccccccc");
  
        
     }

  ngOnInit() {

   

    if ( this.auth.estaAutenticado()) {

        
                
        this.nombreusr = localStorage.getItem('nombreusr');

        const parts = this.nombreusr.split('@');
        const username = parts[0];

       
        this.items = [
            {
                label: 'Nosotros',
                icon: 'pi pi-fw pi-eject',
                routerLink: '/miembros'
  
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
              label: 'Reflexiones',
              icon: 'pi pi-fw pi-play'
  
          },
          {
              label: 'Transmisiones',
              icon: 'pi pi-fw pi-facebook'
  
          },
            {
                label: username,
                icon: 'pi pi-fw pi-user',
                items: [
                 
                    {
                        label: 'Mi perfil',
                        icon: 'pi pi-fw pi-user-plus',
                        routerLink: '/homeadmin'
                    
                    },
                    {
                        label: 'Cerrar sesión',
                        icon: 'pi pi-fw pi-power-off',
                        command: () => this.salirApp(),
                    }
                ]
                
            }
        ];

        return true;
        
      } else{

      
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
              label: 'Reflexiones',
              icon: 'pi pi-fw pi-play'
  
          },
          {
              label: 'Transmisiones',
              icon: 'pi pi-fw pi-facebook'
  
          },
            {
                label: 'Mi Cuenta',
                icon: 'pi pi-fw pi-user',
                routerLink: '/login'
            }
        ];
        return true;
  
      }
   }

   salirApp(){

    console.log("ssssssss");
    this.auth.loguot();
    this.ngOnInit();

    this.router.navigateByUrl('/home');
    //this.router.navigate(['Home']);

    //this.router.navigateByUrl('/home', {skipLocationChange: true}).then(()=>
    //this.router.navigate(["navbar"]));


  }
}

