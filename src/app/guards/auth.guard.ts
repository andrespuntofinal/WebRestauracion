import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor( private auth: AuthService,
    private router: Router ) { }



  canActivate( ): boolean {

    console.log('guard');

    if ( this.auth.estaAutenticado()) {

      console.log('autenticado');

      return true;
      
    } else{

      console.log('no autenticado');

      this.router.navigateByUrl('/home');
      return false;

    }

  }
  
}
