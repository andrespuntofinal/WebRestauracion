import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { UsuariosResponse } from 'src/app/interfaces/UsuariosResponse';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { AvatarModule } from 'primeng/avatar';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  providers: [MessageService]
  //styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  //variables table crud
  usuarioDialog: boolean = false;

    deleteUsuarioDialog: boolean = false;

    deleteUsuarioSDialog: boolean = false;

    usuarios: UsuarioModel[] = [];

    Usuario: UsuarioModel[] = [];

    selectedUsuarios: UsuarioModel[] = [];

    submitted: boolean = false;

    cols: any[] = [];

    statuses: any[] = [];

    rowsPerPageOptions = [5, 10, 20];

  public listUsuarios: UsuarioModel[];

  constructor(private usuariosService: UsuariosService, private messageService: MessageService ) {
  }
  
  ngOnInit() {

    this.usuariosService.getUsuarios()
    .subscribe( data => {

      this.usuarios= data.usuarios;
         
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

  
}
