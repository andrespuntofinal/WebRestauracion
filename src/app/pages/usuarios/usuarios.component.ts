import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { AuthService } from 'src/app/services/auth.service';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { AvatarModule } from 'primeng/avatar';
import Swal from 'sweetalert2';
import { state } from '@angular/animations';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  providers: [MessageService]
  //styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit, OnDestroy {

  uploadedFiles: any[] = [];

  private miSuscripcion: Subscription;
  usuarioDialog: boolean = false;

  imageDialog: boolean = false;

  uid: any;
  accion = 'CREAR USUARIO';
  controlError: number = 0;
  cardStates: { [key: number]: boolean } = {};
   

    usuarios: UsuarioModel[] = [];

    rol: any[] = [];

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
    private route:ActivatedRoute, private router:Router,
    private auth: AuthService ) {
  }
  
  ngOnInit(): void {

    this.rol = [
      { label: 'BÁSICO', value: 'USER_ROLE' },
      { label: 'ADMINISTRADOR', value: 'ADMIN_ROLE' },
      { label: 'CONTABLE', value: 'CONTA_ROLE' }
  ];

   
    this.cargarUsuarios();


    }

    ngOnDestroy() {
      this.miSuscripcion.unsubscribe();
    
      }
  

   

cargarUsuarios(){


  console.log('tooken', localStorage.getItem('token'));
  
  this.miSuscripcion = this.usuariosService.getUsuarios()
  .subscribe( data => {

    this.usuarios= data.usuarios;

    //this.Usuario = data.;
      
  console.log( "dataaa:", this.usuarios  );

  

    
  },
  (error: any) => {

    
 console.log('codigo error', error.status);

    if (error.status === 401) {

      this.ngOnDestroy();
      this.router.navigateByUrl('/login');
      
    }
  })

}

    onGlobalFilter(table: Table, event: Event) {
      table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  deleteUsuario(Usuario: UsuarioModel) {
    
    
    this.Usuario = { ...Usuario };

    Swal.fire({
      title: 'Eliminación Usuario',
      text: this.Usuario['nombre'],
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.confirmDelete();
        Swal.fire(
          'Eliminado',
          'Registro eliminado correctamente',
          'success'
        )
      }
    })

    
}


confirmDelete() {

this.uid = this.Usuario['_id'];

console.log("seleccionadoxxxxx Eliinar", this.uid);

this.usuariosService.deleteUsuarios(this.uid).subscribe(data => {
this.cargarUsuarios();


  })


}

editUsuario(Usuario: UsuarioModel) {

   this.accion = 'ACTUALIZAR USUARIO';
   this.Usuario = { ...Usuario };
    this.usuarioDialog= true;

    this.uid = this.Usuario['_id'];
}

hideDialog() {
  this.usuarioDialog = false;
  this.submitted = false;
}

saveUsuario() {

  if (this.accion === 'CREAR USUARIO') {

     this.crearUsuario();
    
  }

  if (this.accion === 'ACTUALIZAR USUARIO') {

    this.updateUsuario();

    
  }
  
 
   
 
}

updateUsuario(){

this.uid = this.Usuario['_id'];

this.submitted = true;

const usuariosPut: UsuarioModel = {

  nombre: this.Usuario['nombre'],
  email:  this.Usuario['email'],
  rol:    this.Usuario['rol'],
  uid:    this.Usuario['uid'],
  estado: this.Usuario['estado'],
  password: this.Usuario['password'],

  
};

if ( this.Usuario['uid'] != null  && this.Usuario['nombre']?.trim() && this.Usuario['email']?.trim() && this.Usuario['rol']?.trim() && this.Usuario['estado']?.trim() && this.Usuario['password']?.trim()) {
   
  this.usuariosService.putUsuarios(this.uid, usuariosPut).subscribe( data => {
       
      
   });

   Swal.fire({
     title: 'Actualización Usuario',
    text: this.Usuario['nombre'],
     icon: 'success',
    confirmButtonText: 'Aceptar'
   })

   
  this.usuarios[this.findIndexById(this.Usuario._id)] = this.Usuario;

  console.log('iddd', this.Usuario['uid']);

 // this.usuarios.push(this.Usuario);
  this.usuarioDialog = false;
  this.accion = '';
}



}

crearUsuario(){

  this.submitted = true;
  
  const usuariosPost: UsuarioModel = {

    nombre: this.Usuario['nombre'],
    email:  this.Usuario['email'],
    rol:    this.Usuario['rol'],
    uid:    this.Usuario['uid'],
    password:   this.Usuario['password'],
    estado: "ACTIVO",
    
  };

  if ( this.Usuario['uid'] != null  && this.Usuario['nombre']?.trim() && this.Usuario['email']?.trim() && this.Usuario['rol']?.trim() && this.Usuario['password']?.trim()) {
   
   this.usuariosService.postUsuarios(usuariosPost).subscribe( data => {

    console.log('SIN control error');
    Swal.fire({
      title: 'Creación Usuario',
     text: this.Usuario['nombre'],
      icon: 'success',
     confirmButtonText: 'Aceptar'
    })



   this.ngOnInit();
   this.usuarios.push(usuariosPost);
   this.usuarioDialog = false;
   this.accion = '';
   this.auth.nuevoUsuario( usuariosPost )
   .subscribe ( resp =>  {

})
      
    },
      (error: any) => {

      if (error.status === 400) {
        
        Swal.fire({
        title: 'Creación registro Fallida',
        text: 'El correo ' + this.Usuario['email'] + ' ya existe',
        icon: 'error',
        confirmButtonText: 'Aceptar'
    })

   this.usuarioDialog = false;
   this.accion = '';
      }

      if (error.status === 401) {
        
        this.router.navigateByUrl('/login');
      }
     
      
    }
    );

        

 
    
}
    

}

openNew() {

  this.accion = 'CREAR USUARIO';
  this.Usuario = {};
  this.submitted = false;
  this.usuarioDialog = true;
  
}

openNewimage(Usuario: UsuarioModel) {

  this.Usuario = { ...Usuario };
  this.imageDialog = true;
  
    
  }

findIndexById(_id: string): number {
  let index = -1;
  for (let i = 0; i < this.usuarios.length; i++) {
      if (this.usuarios[i]._id === _id) {
          index = i;
          break;
      }
  }

  return index;
}

filtrar(termino: any){

 
  this.miSuscripcion = this.usuariosService.getUsuariosFiltro(termino)
  .subscribe( data => {

    this.usuarios= data['results'];
   
                
  })
  
}

onUpload(event: any)  {
  
  this.uid = this.Usuario['_id'];
  const file: File = event.files[0];

  console.log('imagennnn', file);

  this.usuariosService.uploadFile(this.uid, file).subscribe( data => {

    this.ngOnInit();
    this.imageDialog = false;

    Swal.fire({
      title: 'Imágen actualizada',
     text: this.Usuario['nombre'],
      icon: 'success',
     confirmButtonText: 'Aceptar'
    })
             
  }, error => {
    console.error('Error al subir el archivo', error);
    // Maneja el error según tus necesidades
  });

 
}


toggleCard(index: number) {
  this.cardStates[index] = !this.cardStates[index];
}
  
}
