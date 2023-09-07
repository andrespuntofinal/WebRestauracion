import { Component } from '@angular/core';
import { MiembrosService } from './services/miembros.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'FrontRestauracion';

  constructor( private miembrosService: MiembrosService){

    
  
  }
}


