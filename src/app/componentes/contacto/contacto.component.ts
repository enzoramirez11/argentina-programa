import { Component, OnInit } from '@angular/core';
import { PorfolioService } from 'src/app/servicios/porfolio.service';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent implements OnInit {

  constructor(private portfolio:PorfolioService) { }
  datosContacto:any= {
    email:"",
    nro_telefono:"",
    ciudad:"",
    provincia:"",
    pais:"",
    linkedin:"",
    github:""
  }
  datosUsuario:any;
  ngOnInit(): void {
    this.portfolio.infoContacto(localStorage.getItem('token')).subscribe((res:any) => {
      this.datosContacto.nro_telefono=res.nro_telefono;
      this.datosContacto.ciudad=res.ciudad;
      this.datosContacto.provincia=res.provincia;
      this.datosContacto.pais=res.pais;
      this.datosContacto.linkedin=res.linkedin;
      this.datosContacto.github=res.github;
    });
    this.portfolio.infoPersonal(localStorage.getItem('token')).subscribe(res => {
      this.datosContacto.email=res;
    })
  }
}
