import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { UsuarioModel } from '../../models/usuario.model';

import  Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: UsuarioModel = new UsuarioModel();
  recordarme: boolean;
  @Output() usuarioapp: string;
  
  
  constructor( private auth: AuthService,
    private router: Router ) { }

  ngOnInit() {

    
    localStorage.removeItem('token');
    localStorage.removeItem('nombreusr');
    localStorage.removeItem('expira');
    localStorage.removeItem('uid');


    this.recordarme = false;
    if ( localStorage.getItem('email')) {
       this.usuario.email = localStorage.getItem('email');
      this.recordarme = true;
    }


  }

  login( form: NgForm ) {

    if (form.invalid) { return; }

    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espere por favor'
    });

    Swal.showLoading();

    this.auth.login( this.usuario )
    .subscribe( resp => {

      console.log(resp);
      Swal.close();

      if (this.recordarme) {
        localStorage.setItem('email', this.usuario.email);
      }

      
      localStorage.setItem('uid', resp['localId']);
      
      const email = this.usuario.email;
      const password = this.usuario.password;

      const usuarioToken = { email: email, password: password };

      

      this.auth.obtenerTokenApi(usuarioToken).subscribe( resp => {
       
        console.log('token desde apitoken', resp['token']);
      });
      
      this.router.navigateByUrl('/homeadmin');
      //window.location.reload();
      //this.router.navigateByUrl('/homeadmin');

    }, (err) => {
      console.log(err.error.error.message);
      Swal.fire({
        
        icon: 'error',
        title: 'Error al autenticar',
        text: err.error.error.message
      });

    });

 
   }


}