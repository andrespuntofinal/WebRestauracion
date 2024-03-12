import { Component, OnInit, Input, Output, EventEmitter  } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AuthService } from '../../services/auth.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Router } from '@angular/router';
import { UsuarioModel } from 'src/app/models/usuario.model';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @Input() titulo: string;
  
  items: MenuItem[] | undefined;
  menuItems: MenuItem[] = [];
 
  nombreusr: string;
  nombreapp: string = '';
  control: string;
  usuarios: UsuarioModel[] = [];
  Usuario: UsuarioModel= {}

  @Output() eventActionSidebar = new EventEmitter<boolean>();
  @Input() sidebarVisible!: boolean;
  @Input() usuarioapp: string;

  
  constructor( public auth: AuthService,
    private usuariosService: UsuariosService,
    private router: Router ) {
       
  
        
     }

     
       ngOnInit() {

    

    if ( this.auth.estaAutenticado()) {
       
      
                
        this.nombreusr = localStorage.getItem('nombreusr');

        
       // const parts = this.nombreusr.split('@');
       // const username = parts[0];

        this.cargarUsuario(this.nombreusr);

       
       
        
      } else{

      
        this.cargarManuInactive();
  
      }

      
   }

   salirApp(){

    this.auth.loguot();
    this.ngOnInit();
    this.router.navigateByUrl('/home');
 


  }

   cargarUsuario(email){

    console.log("paso 33333");    

    
    this.usuariosService.getUsuariosEmail(email)
    .subscribe( data => {
    
     // this.Usuario= data;

     
    
      this.Usuario = data['0'];

      this.nombreapp = this.Usuario.nombre;
         
      console.log( "data img", this.Usuario.imagen);
    
    this.cargarManuActive();
      
    })
    
  }

  cargarManuActive(){


    this.items = [

      {
        label: 'Home',
        icon: 'pi pi-fw pi-home',
        routerLink: '/home'

      },
      {
        label: 'Nosotros',
        icon: 'pi pi-fw pi-eject'       

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
        label: 'Administración',
        icon: 'pi pi-fw pi-cog', 
        
       
        items: [
          {
            label: 'Administración',
            icon: 'pi pi-fw pi-cog',
            routerLink: '/homeadmin'
  
          },
          {
            label: 'Membresía',
            icon: 'pi pi-fw pi-user',
            routerLink: '/miembros'
  
          },
          {
            label: 'Usuarios',
            icon: 'pi pi-fw pi-user',
            routerLink: '/usuarios'
  
          },
          {
            label: 'Finanzas',
            icon: 'pi pi-fw pi-dollar',
            routerLink: '/finanzas'
  
          } 
  
  
        ]

    }
    
  ];

  this.menuItems = [
    {
      label: 'Perfil',
      icon: 'pi pi-fw pi-cog',
      routerLink: '/usuarios'

    },

    {
      label: 'Cerrar Sesión',
      icon: 'pi pi-sign-out',
      command: ()=> this.salirApp(),

    },
];

  return true;
  }

  cargarManuInactive(){
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

