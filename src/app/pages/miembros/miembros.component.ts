import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MiembrosService } from 'src/app/services/miembros.service';
import { AuthService } from 'src/app/services/auth.service';
import { MiembroModel } from 'src/app/models/miembro.model';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { Table } from 'primeng/table';
import { AvatarModule } from 'primeng/avatar';
import Swal from 'sweetalert2';
import { state } from '@angular/animations';
import { Subscription } from 'rxjs';
import { DatePipe } from '@angular/common';
import { Calendar, CalendarModule } from 'primeng/calendar';


@Component({
  selector: 'app-miembros',
  templateUrl: './miembros.component.html',
  providers: [MessageService],
  //styleUrls: ['./miembros.component.css']
})


export class MiembrosComponent implements OnInit, OnDestroy {

 es: any;
  uploadedFiles: any[] = [];
  isFlipped: boolean = false;
  cardStates: { [key: number]: boolean } = {};

  private miSuscripcion: Subscription;
  miembroDialog: boolean = false;
  imageDialog: boolean = false;

  numero_id: any;
  accion = 'CREAR MIEMBROS';
  controlError: number = 0;
   

    miembros: MiembroModel[] = [];

    Miembro: MiembroModel= {}

    estadocivil: any[] = [];

    tipo_id: any[] = [];

    tipomiembro: any[] = [];

    poblacion: any[] = [];

    ministerio: any[] = [];

    ocupacion: any[] = [];

    grupo_celular: any[] = [];

    estado: any[] = [];

    selectedMiembros: MiembroModel[] = [];

    valoresSeleccionadosString: string;

    submitted: boolean = false;

    cols: any[] = [];

    statuses: any[] = [];

    rowsPerPageOptions = [5, 10, 15];

    
  public listMiembros: MiembroModel[];
  //usuario: any;

  constructor(
    private miembrosService: MiembrosService, private messageService: MessageService,
    private route:ActivatedRoute, private router:Router,
    private auth: AuthService,
    private datePipe: DatePipe
   ) {
  }
  
  ngOnInit(): void {

    this.estadocivil = [
      { label: 'Casado', value: 'Casado' },
      { label: 'Soltero', value: 'Soltero' },
      { label: 'Unión libre', value: 'Unión libre' },
      { label: 'Otro', value: 'Otro' }
  ];

  this.tipo_id = [
    { label: 'Cédula', value: 'C.C' },
    { label: 'Tarjeta de identidad', value: 'T.I' },
    { label: 'Cédula extranjería', value: 'C.E' },
    { label: 'Pasaporte', value: 'PAS' },
    { label: 'Registro civil', value: 'R.C' }
];

  this.tipomiembro = [
    { label: 'Líder', value: 'Líder' },
    { label: 'Nuevo', value: 'Nuevo' },
    { label: 'Asistente regular', value: 'Asistente regular' },
    { label: 'Asistente irregular', value: 'Asistente irregular' }
];

this.poblacion = [
  { label: 'Infante', value: 'Infante' },
  { label: 'Niño', value: 'Niño' },
  { label: 'Adolescente', value: 'Adolescente' },
  { label: 'Jóven', value: 'Jóven' },
  { label: 'Adulto', value: 'Adulto' },
  { label: 'Anciano', value: 'Anciano' }
];

this.ocupacion = [
  { label: 'Empleado', value: 'Empleado' },
  { label: 'Desempleado', value: 'Desempleado' },
  { label: 'Estudiante', value: 'Estudiante' },
  { label: 'Hogar', value: 'Hogar' },
  { label: 'Otro', value: 'Otro' }
];

this.grupo_celular = [
  { label: 'Ninguno', value: 'Ninguno' },
  { label: 'Central', value: 'Central' },
  { label: 'San Javier', value: 'San Javier' },
  { label: 'Norte', value: 'Norte' },
  { label: 'Sur', value: 'Sur' }

];

this.ministerio = [
  { label: 'Ninguno', value: 'Ninguno' },
  { label: 'Maestro ED', value: 'Maestro ED' },
  { label: 'Jóvenes', value: 'Jóvenes' },
  { label: 'Alabanza', value: 'Alabanza' },
  { label: 'Diaconado', value: 'Diaconado' },
  { label: 'Evangelismo', value: 'Evangelismo' },
  { label: 'Medios', value: 'Medios' },
  { label: 'Ayuda Social', value: 'Ayuda Social' },
  { label: 'Líder célula', value: 'Líder célula' }
 
];

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
      
  console.log( "data:", this.miembros  );
  
    
  },
  (error: any) => {

    
 console.log('codigo error', error.status);

    if (error.status === 401) {

      this.ngOnDestroy();
      this.router.navigateByUrl('/login');
      
    }
  })
  

  this.checkBirthday()

}

filtrar(termino: any){

  console.log('FILTRANDO', termino);
  this.miSuscripcion = this.miembrosService.getMiembrosFiltro(termino)
  .subscribe( data => {

    this.miembros= data['results'];
   
                
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

console.log("id eliminar", this.numero_id);

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
  tipo_id:  this.Miembro['tipo_id'],
  telefono:  this.Miembro['telefono'],
  celular:  this.Miembro['celular'],
  barrio:  this.Miembro['barrio'],
  direccion:  this.Miembro['direccion'],
  sexo:  this.Miembro['sexo'],
  poblacion:  this.Miembro['poblacion'],
  estado_civil:  this.Miembro['estado_civil'],
  tipo_miembro:  this.Miembro['tipo_miembro'],
  bautizado:  this.Miembro['bautizado'],
  fecha_membresia:  this.datePipe.transform(this.Miembro['fecha_membresia'], 'MM/dd/yyyy'),
  fecha_nacimiento:  this.datePipe.transform(this.Miembro['fecha_nacimiento'], 'MM/dd/yyyy'),
  lider_contacto:  this.Miembro['lider_contacto'],
  ministerio:  this.Miembro['ministerio'],
  ocupacion:  this.Miembro['ocupacion'],
  grupo_celular:  this.Miembro['grupo_celular'],
  estado:  this.Miembro['estado'],
 
  
};

if ( this.Miembro['numero_id'] != null  && this.Miembro['nombre']?.trim()) {
  console.log('data antes put', miembrosPut);
  this.miembrosService.putMiembros(this.numero_id, miembrosPut).subscribe( data => {
       
      
   });

   Swal.fire({
     title: 'Actualización Usuario',
    text: this.Miembro['nombre'],
     icon: 'success',
    confirmButtonText: 'Aceptar'
   })



  this.miembros[this.findIndexById(this.Miembro._id)] = this.Miembro;

  console.log('iddd', this.Miembro['numero_id']);


  this.miembroDialog = false;
  this.accion = '';
}



}

crearMiembro(){

  this.submitted = true;

 // const fechaFormateada: string = this.datePipe.transform(this.Miembro['fecha_nacimiento'], 'MM/dd/yyyy');
  
  const miembrosPost: MiembroModel = {

    nombre: this.Miembro['nombre'],
    email:  this.Miembro['email'],
    numero_id:  this.Miembro['numero_id'],
    tipo_id:  this.Miembro['tipo_id'],
    telefono:  this.Miembro['telefono'],
    celular:  this.Miembro['celular'],
    barrio:  this.Miembro['barrio'],
    direccion:  this.Miembro['direccion'],
    sexo:  this.Miembro['sexo'],
    poblacion:  this.Miembro['poblacion'],
    estado_civil:  this.Miembro['estado_civil'],
    tipo_miembro:  this.Miembro['tipo_miembro'],
    bautizado:  this.Miembro['bautizado'],
    fecha_membresia:  this.datePipe.transform(this.Miembro['fecha_membresia'], 'MM/dd/yyyy'),
    fecha_nacimiento:  this.datePipe.transform(this.Miembro['fecha_nacimiento'], 'MM/dd/yyyy'),
    lider_contacto:  this.Miembro['lider_contacto'],
    ministerio:  this.valoresSeleccionadosString,
    ocupacion:  this.Miembro['ocupacion'],
    grupo_celular:  this.Miembro['grupo_celular'],
    estado:  this.Miembro['estado'],
    
  };

  if ( this.Miembro['numero_id'] != null  && this.Miembro['nombre']?.trim()) {

    console.log('data antes POST', miembrosPost);
   
   this.miembrosService.postMiembros(miembrosPost).subscribe( data => {

    
    Swal.fire({
      title: 'Creación Miembro',
     text: this.Miembro['nombre'],
      icon: 'success',
     confirmButtonText: 'Aceptar'
    })

   this.ngOnInit();
   this.miembros.push(miembrosPost);
   this.miembroDialog = false;
   this.accion = '';
      
    },
      (error: any) => {

      if (error.status != 200) {
        
        Swal.fire({
        title: 'Error',
        text: 'Creación registro Fallida',
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

onMultiSelectChange(event: any) {
  // Obtén los valores seleccionados y conviértelos en una cadena separada por comas
  this.valoresSeleccionadosString = event.value.map(item => item.value).join(',');

  console.log("ttttttttt", this.valoresSeleccionadosString);
}

openNew() {

  this.accion = 'CREAR MIEMBRO';
  this.Miembro = {};
  this.submitted = false;
  this.miembroDialog = true;


  
}

openNewimage(Miembro: MiembroModel) {

this.Miembro = { ...Miembro };
this.imageDialog = true;

  
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

onUpload(event: any)  {
  //for (const file of event.files) {
     // this.uploadedFiles.push(file);
  //}
  this.numero_id = this.Miembro['_id'];
  const file: File = event.files[0];

  console.log('imagennnn', file);

  this.miembrosService.uploadFile(this.numero_id, file).subscribe( data => {

    this.ngOnInit();
    this.imageDialog = false;

    Swal.fire({
      title: 'Imágen actualizada',
     text: this.Miembro['nombre'],
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


checkBirthday() {
  const fechaNacimiento = '03/09/1984';
  const indicador = this.compararFechaNacimiento(fechaNacimiento);
  console.log('cumpleee', indicador); // Imprime el indicador basado en la comparación
}

compararFechaNacimiento(fechaNacimiento: string): { indicador: number, dia: number }  {
  const hoy = new Date();
  const partesFecha = fechaNacimiento.split('/');
  // Asumiendo que fechaNacimiento está en formato MM/DD/YYYY
  const nacimiento = new Date(hoy.getFullYear(), parseInt(partesFecha[0], 10) - 1, parseInt(partesFecha[1], 10));
  
  let indicador = 0;
  // Comparar mes y día
  if (hoy.getMonth() === nacimiento.getMonth() && hoy.getDate() === nacimiento.getDate()) {

    indicador = 2;
    
    // Mes y día coinciden
  } else if (hoy.getMonth() === nacimiento.getMonth()) {

    indicador = 1;

  } 

  return {
    indicador: indicador,
    dia: nacimiento.getDate()
  };
}

  
}
