import { Component, OnInit } from '@angular/core';
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

  constructor( private auth: AuthService,
    private router: Router ) { }

  ngOnInit() {


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

      //console.log("xxxxxxxx" + resp['localId']);
      localStorage.setItem('uid', resp['localId']);
      

      this.router.navigateByUrl('/Homeadmin');


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