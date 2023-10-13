import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MiembrosService } from 'src/app/services/miembros.service';
import { AuthService } from 'src/app/services/auth.service';
import { MiembroModel } from 'src/app/models/miembro.model';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { AvatarModule } from 'primeng/avatar';
import Swal from 'sweetalert2';
import { state } from '@angular/animations';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-miembros',
  templateUrl: './miembros.component.html',
  providers: [MessageService]
  //styleUrls: ['./usuarios.component.css']
})


export class MiembrosComponent implements OnInit, OnDestroy {

  
  uploadedFiles: any[] = [];


  private miSuscripcion: Subscription;
  miembroDialog: boolean = false;

  numero_id: any;
  accion = 'CREAR MIEMBROS';
  controlError: number = 0;
   

    miembros: MiembroModel[] = [];

    Miembro: MiembroModel= {}

    selectedMiembros: MiembroModel[] = [];

    submitted: boolean = false;

    cols: any[] = [];

    statuses: any[] = [];

    rowsPerPageOptions = [5, 10, 15];

  public listMiembros: MiembroModel[];
  //usuario: any;

  constructor(
    private miembrosService: MiembrosService, private messageService: MessageService,
    private route:ActivatedRoute, private router:Router,
    private auth: AuthService ) {
  }
  
  ngOnInit(): void {

   
    this.cargarMiembros();


    }

    ngOnDestroy() {
      this.miSuscripcion.unsubscribe();
    
      }

    onBasicUpload() {
        this.messageService.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded with Basic Mode' });
    }
  
    
cargarMiembros(){


  console.log('tooken', localStorage.getItem('token'));
  
  this.miSuscripcion = this.miembrosService.getMiembros()
  .subscribe( data => {

    this.miembros= data.miembros;

    //this.Usuario = data.;
      
  console.log( "data:", this.miembros  );

  this.cols = [
    { field: 'nombre', header: 'Nombre' },
    { field: 'email', header: 'Email' }
 
  ];

    
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

  deleteMiembro(Miembro: MiembroModel) {
    
    
    this.Miembro = { ...Miembro };

    Swal.fire({
      title: 'Eliminación Miembro',
      text: this.Miembro['nombre'],
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

this.numero_id = this.Miembro['_id'];

//console.log("seleccionadoxxxxx", this.uid);

this.miembrosService.deleteMiembros(this.numero_id).subscribe(data => {
this.cargarMiembros();


  })


}

editMiembro(Miembro: MiembroModel) {

   this.accion = 'ACTUALIZAR MIEMBRO';
   this.Miembro = { ...Miembro };
    this.miembroDialog= true;

    this.numero_id = this.Miembro['_id'];
}

hideDialog() {
  this.miembroDialog = false;
  this.submitted = false;
}

saveMiembro() {

  if (this.accion === 'CREAR MIEMBRO') {

     this.crearMiembro();
    
  }

  if (this.accion === 'ACTUALIZAR MIEMBRO') {

    this.updateMiembro();

    
  }
  
 
   
 
}

updateMiembro(){

this.numero_id = this.Miembro['_id'];

this.submitted = true;

const miembrosPut: MiembroModel = {

  nombre: this.Miembro['nombre'],
  email:  this.Miembro['email'],
  numero_id:  this.Miembro['numero_id'],
  
  
};

if ( this.Miembro['numero_id'] != null  && this.Miembro['nombre']?.trim() && this.Miembro['email']?.trim()) {
   
  this.miembrosService.putMiembros(this.numero_id, miembrosPut).subscribe( data => {
       
      
   });

   Swal.fire({
     title: 'Actualización Usuario',
    text: this.Miembro['nombre'],
     icon: 'success',
    confirmButtonText: 'Aceptar'
   })

   
   //this.usuarios = [];
   //this.Usuario =  {};
   //this.cargarUsuarios();
  //this.usuarios.push(usuariosPut);

  this.miembros[this.findIndexById(this.Miembro._id)] = this.Miembro;

  console.log('iddd', this.Miembro['numero_id']);

 // this.usuarios.push(this.Usuario);
  this.miembroDialog = false;
  this.accion = '';
}



}

crearMiembro(){

  this.submitted = true;
  
  const miembrosPost: MiembroModel = {

    numero_id: this.Miembro['numero_id'],
    nombre: this.Miembro['nombre'],
    email:  this.Miembro['email'],
    ministerio:  'MEDIOS',
     estado: true,
    
  };

  if ( this.Miembro['numero_id'] != null  && this.Miembro['nombre']?.trim() && this.Miembro['email']?.trim()) {
   
   this.miembrosService.postMiembros(miembrosPost).subscribe( data => {

    
    Swal.fire({
      title: 'Creación Miembro',
     text: this.Miembro['nombre'],
      icon: 'success',
     confirmButtonText: 'Aceptar'
    })

   this.miembros.push(miembrosPost);
   this.miembroDialog = false;
   this.accion = '';
      
    },
      (error: any) => {

      if (error.status === 400) {
        
        Swal.fire({
        title: 'Creación registro Fallida',
        text: 'El correo ' + this.Miembro['email'] + ' ya existe',
        icon: 'error',
        confirmButtonText: 'Aceptar'
    })

   this.miembroDialog = false;
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

  this.accion = 'CREAR MIEMBRO';
  this.Miembro = {};
  this.submitted = false;
  this.miembroDialog = true;


  
}

findIndexById(_id: string): number {
  let index = -1;
  for (let i = 0; i < this.miembros.length; i++) {
      if (this.miembros[i]._id === _id) {
          index = i;
          break;
      }
  }

  return index;
}

  
}
