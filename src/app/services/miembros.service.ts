import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable, throwError  } from 'rxjs';
import { map, catchError  } from 'rxjs/operators';
import { MiembrosResponse } from '../interfaces/MiembrosResponse';
import { MiembroModel } from 'src/app/models/miembro.model';

@Injectable({
  providedIn: 'root'
})
export class MiembrosService  implements OnInit {

  myAppUrl= environment.myAppUrl ;
  myAppUrlApi="api/miembros/";
  myAppUrlApiUpload="api/uploads/miembros/";
  myAppUrlApiBus="api/buscar/miembros/";

  
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

   getMiembros():Observable<MiembrosResponse>{

    this.ngOnInit();
    
    return this.http.get<MiembrosResponse>(this.myAppUrl + this.myAppUrlApi, this.httpOptions )
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

  getMiembrosEmail(email: any):Observable<MiembroModel>{
     
    return this.http.get<MiembroModel>(this.myAppUrl + this.myAppUrlApiBus + email)
    .pipe(map( data=> data['results']));
    
  }

  getMiembrosFiltro( termino: any):Observable<MiembrosResponse>{
       
    return this.http.get<MiembrosResponse>(this.myAppUrl + this.myAppUrlApiBus + termino)
    .pipe(map( data=> data));
    
  }

  postMiembros(usuarios: MiembroModel):Observable<any>{

   return this.http.post(this.myAppUrl + this.myAppUrlApi, usuarios, this.httpOptions )
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

  deleteMiembros(uid: any):Observable<MiembroModel> {
    return this.http.delete<MiembroModel>(this.myAppUrl + this.myAppUrlApi + uid, this.httpOptions);
    
  }

  putMiembros( uid: any, usuarios: MiembroModel ):Observable<MiembroModel> {

    return this.http.put<MiembroModel>(this.myAppUrl + this.myAppUrlApi + uid, usuarios, this.httpOptions);

  }

  uploadFile( uid: any, file: File ):Observable<any> {

    const formData: FormData = new FormData();
    formData.append('archivo', file, file.name);
    
    return this.http.put<any>(this.myAppUrl + this.myAppUrlApiUpload + uid, formData);

  }
}