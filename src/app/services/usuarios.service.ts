import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UsuariosResponse } from '../interfaces/UsuariosResponse';

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
}
