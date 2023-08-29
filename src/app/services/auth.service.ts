import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsuarioModel } from '../models/usuario.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = 'https://identitytoolkit.googleapis.com/v1/accounts';
  private apikey = 'AIzaSyBMwHSn93JmIwv4t7lZ7ofAR_v_A869hAM';
  private userToken: string;

  //crear usuario
  //https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]

  //login usuario
  //https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]

  constructor( private http: HttpClient ) {

    this.leerToken();
   }

   loguot(){

    localStorage.removeItem('token');
    localStorage.removeItem('nombreusr');
    this.userToken = '';

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

        
        this.guardarToken( resp['idToken'] );
        return resp;
      })

    );

  }

  private guardarToken( idToken: string ){

    this.userToken = idToken;
    localStorage.setItem('token', idToken);
    

    let hoy = new Date();
    hoy.setSeconds( 3600 );

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
}

