import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UsuariosResponse } from '../interfaces/UsuariosResponse';
import { UsuarioModel } from 'src/app/models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  myAppUrl= environment.myAppUrl ;
  myAppUrlApi="api/usuarios/";

  httpOptions={

    headers: new HttpHeaders({
      'Content-Type': 'application/json'

    })
  };

  constructor(private http: HttpClient) { }

 // getUsuarios():Observable<UsuariosResponse[]>{
  getUsuarios():Observable<UsuariosResponse>{

    console.log("11111" + this.myAppUrl + this.myAppUrlApi);

    //return this.http.get<UsuariosResponse[]>(this.myAppUrl + this.myAppUrlApi)
     //               .pipe(map( data=> data['usuarios']));

    return this.http.get<UsuariosResponse>(this.myAppUrl + this.myAppUrlApi);
    //.pipe(map( data=> data['usuarios']));
    
  }

  postUsuarios(usuarios: UsuarioModel):Observable<any>{

    console.log("ANTES DE POST" ,usuarios);

   return this.http.post(this.myAppUrl + this.myAppUrlApi, usuarios, this.httpOptions ).pipe(map((data: any) => {

   }))
    
  }

  deleteUsuarios(uid: any):Observable<UsuarioModel> {
    return this.http.delete<UsuarioModel>(this.myAppUrl + this.myAppUrlApi + uid);
    
  }

  putUsuarios( uid: any, usuarios: UsuarioModel ):Observable<UsuarioModel> {

    return this.http.put<UsuarioModel>(this.myAppUrl + this.myAppUrlApi + uid, usuarios, this.httpOptions);

  }
}