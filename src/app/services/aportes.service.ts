import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable, throwError  } from 'rxjs';
import { map, catchError  } from 'rxjs/operators';
import { AportesResponse } from '../interfaces/AportesResponse';
import { AporteModel } from 'src/app/models/aporte.model';

@Injectable({
  providedIn: 'root'
})
export class AportesService implements OnInit {

  myAppUrl= environment.myAppUrl ;
  myAppUrlApi="api/aportes/";
  myAppUrlApiUpload="api/uploads/miembros/";
  myAppUrlApiBus="api/buscar/aportes/";

  
  httpOptions={

    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'x-token' : localStorage.getItem('token')

    })

    
  };

  constructor(private http: HttpClient) { }

  ngOnInit() {
 
    this.httpOptions ={

      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'x-token' : localStorage.getItem('token')
  
      })
  
      
    }
    }

    getAportes():Observable<AportesResponse>{

      this.ngOnInit();
      
      return this.http.get<AportesResponse>(this.myAppUrl + this.myAppUrlApi, this.httpOptions )
      .pipe(map( data=> data),
      
      catchError((error: any) => {
        if (error.status === 401) {
          console.error('Token caducado');
         
        } else {
          
          console.error('Error:', error);
        }
        return throwError(error);
      })
      )
      
    }

    postAportes(aportes: AporteModel):Observable<any>{

      return this.http.post(this.myAppUrl + this.myAppUrlApi, aportes, this.httpOptions )
      .pipe(map((data: any) => {
   
      }),
      
      catchError((error: any) => {
       if (error.status != 200) {
         console.error('Creación fallida');
      
       } else {
       
         console.error('Error:', error);
       }
       return throwError(error);
     }))
       
     }
}
