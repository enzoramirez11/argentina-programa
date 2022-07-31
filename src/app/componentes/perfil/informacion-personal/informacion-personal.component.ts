import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Persona, PorfolioService } from 'src/app/servicios/porfolio.service';

@Component({
  selector: 'app-informacion-personal',
  templateUrl: './informacion-personal.component.html',
  styleUrls: ['./informacion-personal.component.css']
})
export class InformacionPersonalComponent implements OnInit {

  infoPersonal:FormGroup;

  constructor(private portfolio:PorfolioService, private formBuilder:FormBuilder, private http:HttpClient) { 
    this.infoPersonal = this.formBuilder.group({
      nombre:["",Validators.required],
      apellido:["",Validators.required],
      ocupacion:["",Validators.required],
      sobre_mi:[""],
      url_foto:[""]
    })
  }

  
  datosUsuario:Persona= new Persona();
  mensaje:string;
  completo:boolean=false;
  errorToast:boolean;
  ngOnInit(): void {
    let token:string|null=localStorage.getItem('token');
    this.portfolio.datosUsuario(token).subscribe((res:Persona) => {
      this.datosUsuario=res;
    });    
  }

  actualizarInfoPersonal() {
    this.http.put('http://localhost:8080/editar/'+this.datosUsuario.id, {
      nombre:this.infoPersonal.value.nombre,
      apellido:this.infoPersonal.value.apellido,
      ocupacion:this.infoPersonal.value.ocupacion,
      sobre_mi:this.infoPersonal.value.sobre_mi,
      url_foto:this.infoPersonal.value.url_foto
    }).subscribe(res=> {
      this.completo=true;
      if (res) {
        this.mensaje="Se actualizo con exito"
      }
    },
    (error:any) => {
      this.completo=true;
      console.log(error)
      this.mensaje="Hubo un error";
      this.errorToast=true;
    },
    () => {
      setTimeout(() => {
        this.completo=false;
      },3500);
    }) 
  }

}
