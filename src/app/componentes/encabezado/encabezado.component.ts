import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { PorfolioService } from 'src/app/servicios/porfolio.service';

@Component({
  selector: 'app-encabezado',
  templateUrl: './encabezado.component.html',
  styleUrls: ['./encabezado.component.css']
})
export class EncabezadoComponent implements OnInit {

  constructor(private datosPorfolio:PorfolioService, public authService:AuthService) { }
  
  Persona:any= {
    nombre:"",
    apellido:"",
    sobre_mi:"",
    ocupacion:"",
    url_foto:""
  }
  autNombre:boolean=false; 
  autDescripcion:boolean=false;
  ngOnInit(): void {
    if (this.authService.logIn) {
      this.datosPorfolio.datosUsuario(localStorage.getItem('token')).subscribe( (res:any) => {
        this.Persona=res;
      })
      console.log(this.authService.logIn)
    }
    else {
      this.datosPorfolio.obtenerDatos().subscribe( res => {
        this.Persona=res.persona[0]
      })
    }
  }
}
