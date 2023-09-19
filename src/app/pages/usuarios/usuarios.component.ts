import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { UsuariosResponse } from 'src/app/interfaces/UsuariosResponse';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { AvatarModule } from 'primeng/avatar';
import { Usuario } from '../../interfaces/MiembrosResponse';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  providers: [MessageService]
  //styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  //selectedRoles: any = null;

  //roles: any[] = [{name: 'General', key: 'USER_ROL'}, {name: 'Admin', key: 'USER_ROL'}, {name: 'Contable', key: 'CONTA_ROL'}];

  //variables table crud
  usuarioDialog: boolean = false;

  uid: any;

    deleteUsuarioDialog: boolean = false;

    deleteUsuariosSDialog: boolean = false;

    usuarios: UsuarioModel[] = [];

    Usuario: UsuarioModel= {}

    selectedUsuarios: UsuarioModel[] = [];

    submitted: boolean = false;

    cols: any[] = [];

    statuses: any[] = [];

    rowsPerPageOptions = [5, 10, 15];

  public listUsuarios: UsuarioModel[];
  //usuario: any;

  constructor(
    private usuariosService: UsuariosService, private messageService: MessageService,
    private route:ActivatedRoute, private router:Router ) {
  }
  
  ngOnInit(): void {

    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Usuario creado', life: 3000 });

    this.cargarUsuarios();


    }

    cargarUsuarios(){
// this.selectedRoles = this.roles[0];

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

  deleteUsuario(Usuario: UsuarioModel) {
    
    this.deleteUsuarioDialog = true;
    this.Usuario = { ...Usuario };

    
}

deleteSelectedUsuarios() {
  this.deleteUsuarioDialog = true;

}

confirmDelete() {

this.uid = this.Usuario['_id'];

console.log("seleccionadoxxxxx", this.uid);

this.usuariosService.deleteUsuarios(this.uid).subscribe(data => {
  this.deleteUsuarioDialog = false;
  this.cargarUsuarios();


  })


 // this.uidUser = this.usuarios.filter(val => val.uid !== this.Usuario['uid']);

  
  //this.deleteUsuariosDialog = false;
  //this.usuarios = this.usuarios.filter(val => val.uid !== this.Usuario['uid']);
  //this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
 // this.Usuario = {};

 


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

  const usuariosPost: UsuarioModel = {

    nombre: this.Usuario['nombre'],
    email:  this.Usuario['email'],
    rol:    this.Usuario['rol'],
    uid:    this.Usuario['uid'],
    password:    'Poder4017',
    estado: true,
    
  };

  if ( this.Usuario['uid'] != null  && this.Usuario['nombre']?.trim() && this.Usuario['email']?.trim() && this.Usuario['rol']?.trim()) {
   console.log('55555', usuariosPost );

   this.usuariosService.postUsuarios(usuariosPost).subscribe( data => {
    console.log("dataaa", usuariosPost );

    
      
    });

    Swal.fire({
      title: 'Creación Usuario',
     text: this.Usuario['nombre'],
      icon: 'success',
     confirmButtonText: 'Aceptar'
    })

  
   
   this.usuarios.push(usuariosPost);
   
   this.usuarioDialog = false;

   //this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Usuario creado', life: 3000 });
    
    //this.usuarios = [];
   // this.Usuario = [];
  
    //window.location.reload();

    //this.router.navigateByUrl('usuarios', {skipLocationChange: true}).then(()=>
    //this.router.navigate(["usuarios"])); 

    //this.cargarUsuarios();
}
 
}

openNew() {

  console.log("dialogo");
  this.Usuario = {};
  this.submitted = false;
  this.usuarioDialog = true;


  
}

  
}
