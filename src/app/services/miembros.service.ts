import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MiembrosResponse } from '../interfaces/MiembrosResponse'


@Injectable({
  providedIn: 'root'
})
export class MiembrosService {

  constructor( private http: HttpClient) { }


  getMiembros():Observable<MiembrosResponse>     {

   return this.http.get<MiembrosResponse>('http://localhost:8080/api/miembros')

  }
}
