import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { UsuarioModel } from '../models/usuario.model';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Observable, throwError  } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = environment.urlgoogle;
  private apikey = environment.apikeygoogle;
  private userToken: string;

  myAppUrl= environment.myAppUrl ;
  myAppUrlApi="api/auth/login";

  httpOptions={

    headers: new HttpHeaders({
      'Content-Type': 'application/json'

    })
  };

  //crear usuario
  //https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]

  //login usuario
  //https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]

  constructor( private router: Router,  private http: HttpClient ) {

    this.leerToken();
   }

   loguot(){

    localStorage.removeItem('token');
    localStorage.removeItem('nombreusr');
    localStorage.removeItem('expira');
    localStorage.removeItem('uid');
    this.userToken = '';
    //this.router.navigate(['Home']);

  }

  login( usuario: UsuarioModel ){

    const authData = {
      ...usuario,
      returnSecureToken: true

    };

    return this.http.post(
    `${ this.url }:signInWithPassword?key=${this.apikey}`,
      authData

    )
    .pipe(
      map( resp=> {


        localStorage.setItem('nombreusr', resp['email']);
        this.guardarToken( resp['idToken'] );
        return resp;
      })

    );

  }

  nuevoUsuario (usuario: UsuarioModel ){

    const authData = {
      ...usuario,
      returnSecureToken: true

    };

    return this.http.post(
      //alt + 96 
      `${ this.url }:signUp?key=${this.apikey}`,
      authData

    ).pipe(
      map( resp=> {

        
       // this.guardarToken( resp['idToken'] );
        return resp;
      })

    );

  }

  private guardarToken( idToken: string ){

    this.userToken = idToken;
    localStorage.setItem('token', idToken);
    

    let hoy = new Date();
    hoy.setSeconds( 18000 );

    localStorage.setItem('expira', hoy.getTime().toString() );
  }

  leerToken(){

    if (  localStorage.getItem('token') ) {

      this.userToken = localStorage.getItem('token');
      
    } else {

      this.userToken = '';

    }

    return this.userToken;



  }


  estaAutenticado(): boolean {

    if (this.userToken.length < 2 ) {

      return false;
      
    }

    const expira = Number(localStorage.getItem('expira'));
    const expiraDate = new Date();
    expiraDate.setTime(expira);

    if (expiraDate > new Date()) {
      return true;
      
    } else {

      return false;
    }

    return this.userToken.length > 2;

  }

  obtenerTokenApi(usuarioToken: any){
  
   // console.log('998877', this.myAppUrl + this.myAppUrlApi, usuarioToken, this.httpOptions);
   return this.http.post(this.myAppUrl + this.myAppUrlApi, usuarioToken, this.httpOptions )
   .pipe(
    map( resp=> {

     // console.log('tokennnnnnnnnnn', resp['token']);
      this.guardarToken( resp['token'] );

     // console.log('tokennn', resp['token']);
     return resp;
    })

  );

  }
}

