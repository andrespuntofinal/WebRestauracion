import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { UsuariosResponse } from 'src/app/interfaces/UsuariosResponse';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { AvatarModule } from 'primeng/avatar';
import { Usuario } from '../../interfaces/MiembrosResponse';

interface Rol {
  name: string;
  
}
@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  providers: [MessageService]
  //styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  roles: Rol[] | undefined;

    selectedRole: Rol | undefined;

  //variables table crud
  usuarioDialog: boolean = false;

    deleteUsuarioDialog: boolean = false;

    deleteUsuarioSDialog: boolean = false;

    usuarios: UsuarioModel[] = [];

    Usuario: UsuarioModel[] = [];

    //UsuariosResponse: Usuarios = {};

    selectedUsuarios: UsuarioModel[] = [];

    submitted: boolean = false;

    cols: any[] = [];

    statuses: any[] = [];

    rowsPerPageOptions = [5, 10, 15];

  public listUsuarios: UsuarioModel[];
  //usuario: any;

  constructor(private usuariosService: UsuariosService, private messageService: MessageService ) {
  }
  
  ngOnInit() {

    this.usuariosService.getUsuarios()
    .subscribe( data => {

      this.usuarios= data.usuarios;

      //this.Usuario = data.;
         
    console.log( "data:", this.usuarios  );
 
    this.cols = [
      { field: 'nombre', header: 'Nombre' },
      { field: 'email', header: 'Email' },
      { field: 'rol', header: 'Rol' },
      { field: 'estado', header: 'Estado' }
  ];

  this.statuses = [
      { label: 'INSTOCK', value: 'instock' },
      { label: 'LOWSTOCK', value: 'lowstock' },
      { label: 'OUTOFSTOCK', value: 'outofstock' }
  ];
      
    })


    }

    onGlobalFilter(table: Table, event: Event) {
      table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  deleteUsuario(usuario: UsuarioModel) {
    this.deleteUsuarioDialog = true;
   // this.Usuario = { ...usuario };
}

deleteSelectedUsuarios() {
  this.deleteUsuarioSDialog = true;
}

editUsuario(usuario: UsuarioModel) {
    //this.Usuario = { ...usuario };
    this.usuarioDialog= true;
}

hideDialog() {
  this.usuarioDialog = false;
  this.submitted = false;
}

saveUsuario() {
  this.submitted = true;
 
}

openNew() {

  console.log("dialogo");
  this.Usuario = [];
  this.submitted = false;
  this.usuarioDialog = true;

  this.roles = [
    { name: 'USER_ROLE' },
    { name: 'ADMIN_ROLE' },
    { name: 'CONTA_ROLE' }
    
];
  
}

  
}
