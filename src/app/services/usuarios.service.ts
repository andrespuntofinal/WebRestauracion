import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable, throwError  } from 'rxjs';
import { map, catchError  } from 'rxjs/operators';
import { UsuariosResponse } from '../interfaces/UsuariosResponse';
import { UsuarioModel } from 'src/app/models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService  implements OnInit {

  myAppUrl= environment.myAppUrl ;
  myAppUrlApi="api/usuarios/";
  myAppUrlApiBus="api/buscar/usuarios/";
  myAppUrlApiUpload="api/uploads/usuarios/";
  
  
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

   getUsuarios():Observable<UsuariosResponse>{

    this.ngOnInit();

    console.log("token desde el servicio", localStorage.getItem('token'));

    return this.http.get<UsuariosResponse>(this.myAppUrl + this.myAppUrlApi, this.httpOptions )
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

  getUsuariosEmail(email: any):Observable<UsuarioModel>{

    console.log("55555555" + this.myAppUrl + this.myAppUrlApiBus + email)
   
    return this.http.get<UsuarioModel>(this.myAppUrl + this.myAppUrlApiBus + email)
    .pipe(map( data=> data['results']));
    
  }

  postUsuarios(usuarios: UsuarioModel):Observable<any>{

    console.log("ANTES DE POST" ,usuarios);

   return this.http.post(this.myAppUrl + this.myAppUrlApi, usuarios, this.httpOptions )
   .pipe(map((data: any) => {

   }),
   
   catchError((error: any) => {
    if (error.status === 400) {
      console.error('El correo que está registrando ya existe');
   
    } else {
    
      console.error('Error:', error);
    }
    return throwError(error);
  }))
    
  }

  deleteUsuarios(uid: any):Observable<UsuarioModel> {
    return this.http.delete<UsuarioModel>(this.myAppUrl + this.myAppUrlApi + uid, this.httpOptions);
    
  }

  putUsuarios( uid: any, usuarios: UsuarioModel ):Observable<UsuarioModel> {

    return this.http.put<UsuarioModel>(this.myAppUrl + this.myAppUrlApi + uid, usuarios, this.httpOptions);

  }

  uploadFile( uid: any, file: File ):Observable<any> {

    const formData: FormData = new FormData();
    formData.append('archivo', file, file.name);

    console.log("ANTES DE POST UPLOAD" , file);

    return this.http.put<any>(this.myAppUrl + this.myAppUrlApiUpload + uid, formData);

  }

  getUsuariosFiltro( termino: any):Observable<UsuariosResponse>{
       
    return this.http.get<UsuariosResponse>(this.myAppUrl + this.myAppUrlApiBus + termino)
    .pipe(map( data=> data));
    
  }
}