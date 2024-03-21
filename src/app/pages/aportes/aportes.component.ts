import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AportesService } from 'src/app/services/aportes.service';
import { AuthService } from 'src/app/services/auth.service';
import { MiembrosService } from 'src/app/services/miembros.service';
import { AporteModel } from 'src/app/models/aporte.model';
import { MiembroModel } from 'src/app/models/miembro.model';
import { MessageService, MenuItem, PrimeNGConfig } from 'primeng/api';
import { Table } from 'primeng/table';
import { AvatarModule } from 'primeng/avatar';
import Swal from 'sweetalert2';
import { state } from '@angular/animations';
import { Subscription } from 'rxjs';
import { DatePipe } from '@angular/common';
import { Calendar, CalendarModule } from 'primeng/calendar';

@Component({
  selector: 'app-aportes',
  templateUrl: './aportes.component.html',
    providers: [MessageService],
})
export class AportesComponent implements OnInit, OnDestroy {

  private miSuscripcion: Subscription;

  aportes: AporteModel[] = [];
  Aporte: AporteModel= {}

  
  miembros: MiembroModel[] = [];
  Miembro: MiembroModel= {}
  
  tipo_aporte: any[] = [];
  _id: any;

  accion = 'CREAR APORTES';
  submitted: boolean = false;
 

  selectedAportes: AporteModel[] = [];
  cols: any[] = [];

  filteredMiembros: any[] = [];
  selectedMiembrosAdvanced: any[] = [];

  aporteDialog: boolean = false;

  constructor(
    private aportesService: AportesService, private messageService: MessageService,
    private route:ActivatedRoute, private router:Router,
    private auth: AuthService,
    private datePipe: DatePipe,
    private miembrosService: MiembrosService
   ) {
  }

  ngOnInit(): void {

    this.cargarAportes();
    this.cargarMiembros();

    this.tipo_aporte = [
     
      { label: 'OFRENDA', value: 'OFRENDA' },
      { label: 'DIEZMO', value: 'DIEZMO' },
      { label: 'PRIMICIA', value: 'PRIMICIA' },
      { label: 'PRO TEMPLO', value: 'PRO TEMPLO' },
      { label: 'VENTAS', value: 'VENTAS' },
      { label: 'OTROS', value: 'OTROS' }
  ];

  }

  cargarAportes(){


    console.log('tooken', localStorage.getItem('token'));
    
    this.miSuscripcion = this.aportesService.getAportes()
    .subscribe( data => {
  
    this.aportes= data.aportes;
        
    console.log( "data:", this.aportes  );
    
      
    },
    (error: any) => {
  
      
   console.log('codigo error', error.status);
  
      if (error.status === 401) {
  
        this.ngOnDestroy();
        this.router.navigateByUrl('/login');
        
      }
    })
     
     
  }

  ngOnDestroy() {
    this.miSuscripcion.unsubscribe();
  
    }

    openNew() {

      this.accion = 'CREAR APORTE';
      this.Aporte = {};
      this.submitted = false;
      this.aporteDialog = true;
      
    }

    filtrar(termino: any){

      console.log('FILTRANDO', termino);
      //this.miSuscripcion = this.miembrosService.getMiembrosFiltro(termino)
      //.subscribe( data => {
    
       // this.miembros= data['results'];
       
                    
      //})
      
    }

   deleteSelectedAportes() {
     // this.deleteProductsDialog = true;
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
}

editAport(Aporte: AporteModel) {

  this.accion = 'ACTUALIZAR APORTE';
  this.Aporte = { ...Aporte };
  this.aporteDialog= true;
  this._id = this.Aporte['_id'];

}

deleteAport(Aporte: AporteModel) {

  
}

saveAporte() {

  

  if (this.accion === 'CREAR APORTE') {

    

    this.crearAporte();
   
 }

 if (this.accion === 'ACTUALIZAR APORTE') {

 //  this.updateAporte();

   
 }

}

crearAporte() {

  this.submitted = true;

  const aportesPost: AporteModel = {

    tipo_aporte: this.Aporte['tipo_aporte'],
    fecha_aporte: this.datePipe.transform(this.Aporte['fecha_aporte'], 'MM/dd/yyyy'),
    valor_aporte:  this.Aporte['valor_aporte'],
    observaciones:  this.Aporte['observaciones'],
    miembro: {
      _id: this.Aporte['miembro']['_id'] 
  }
    
  };

  console.log('data antes POST', aportesPost);

  this.aportesService.postAportes(aportesPost).subscribe( data => {

    
    Swal.fire({
      title: 'Creación Aporte',
      text: this.Aporte['tipo_aporte'],
      icon: 'success',
      confirmButtonText: 'Aceptar',
      width: '350px'
    })

   this.ngOnInit();
   this.aportes.push(aportesPost);
   this.aporteDialog = false;
   this.accion = '';
      
    },
      (error: any) => {

      if (error.status != 200) {
        
        Swal.fire({
        title: 'Error',
        text: 'Creación registro Fallida',
        icon: 'error',
        confirmButtonText: 'Aceptar',
        width: '350px'
    })

   this.aporteDialog = false;
   this.accion = '';

   
      }

      if (error.status === 401) {
        
        this.router.navigateByUrl('/login');
      }
     
      
    }
    );


}

updateAporte() {


}

cargarMiembros(){


  
  this.miSuscripcion = this.miembrosService.getMiembros()
  .subscribe( data => {

  this.miembros= data.miembros;
    
    
  })
  

}

hideDialog() {
  this.aporteDialog = false;
  this.submitted = false;
}

filterMiembro(event: any) {
        const filtered: any[] = [];
        const query = event.query;
        for (let i = 0; i < this.miembros.length; i++) {
            const members = this.miembros[i];
            if (members.nombre.toLowerCase().indexOf(query.toLowerCase()) == 0) {

               filtered.push(members);
            }
        }

        this.filteredMiembros = filtered;
    }


    
  

}
