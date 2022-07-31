import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { PorfolioService } from 'src/app/servicios/porfolio.service';

@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.css']
})
export class EducacionComponent implements OnInit {
  
  miPorfolio:any;
  autEducacion:boolean=false;
  estudiosForm:FormGroup;

  constructor(private datosPorfolio:PorfolioService, private router:Router, private formBuilder:FormBuilder, public authService:AuthService, public httpClient:HttpClient) {
    this.estudiosForm= this.formBuilder.group({
      titulo:["", Validators.required],
      institucion:["",Validators.required],
      imgUrl:[""],
      fechaInic:['2001',Validators.required],
      fechaFin:['2001'],
      descripcion:['', Validators.required],
      urlCert:['']
    })
   }
   completo:boolean;
   educacionList:any=[];
  tituloNuevo:string="Titulo";
  anioNuevo:string;
  anioFin:string;
  descripcionNuevo:string="Descripcion";
  urlImagenNuevo:string;
  institucionNuevo:string="Institución"
  img:boolean=false;
  aaa:boolean=false;

  ngOnInit(): void {
    if (this.authService.logIn) {
      this.datosPorfolio.infoEstudios(localStorage.getItem('token')).subscribe( res => {
        this.educacionList=res;
      })
    }
    else {
      this.datosPorfolio.infoEstudios("admin").subscribe( res => {
        this.educacionList=res;
      })
    }
    //Valores modelo de estudios

    this.anioNuevo=this.estudiosForm.value.fechaInic;
    this.anioFin=this.estudiosForm.value.fechaFin;
  }
  editarEducacion() {
    this.autEducacion=true;
  }
  actEducacion() {
    this.autEducacion=false;
  }

  //Nueva Educacion
  getValue(e:Event) {
    return (e.target as HTMLInputElement).value
  }

  onCheckbox() {
    this.aaa=!this.aaa
    if (this.aaa) {
      this.estudiosForm.controls['fechaFin'].disable();
      this.estudiosForm.controls['urlCert'].disable();
    }
    else {
      this.estudiosForm.controls['fechaFin'].enable();
      this.estudiosForm.controls['urlCert'].enable();
    }
  }



  anioF() {
    if (this.anioFin!='' && parseInt(this.anioFin)>parseInt(this.anioNuevo)) {
      return true
    }
    else {
      return false
    }
  }
  agregarEd() {
    if (!this.aaa) {
      if (this.estudiosForm.value.fechaFin<this.estudiosForm.value.fechaInic) {
        this.httpClient.post("http://localhost:8080/personas/crearEducacion/", {
      titulo:this.estudiosForm.value.titulo,
      institucion:this.estudiosForm.value.institucion,
      url_img:this.estudiosForm.value.imgUrl,
      descripcion:this.estudiosForm.value.descripcion,
      fechaInicio:this.estudiosForm.value.fechaInic,
      fechaFin:'',
      url_cert:this.estudiosForm.value.urlCert,
      token: localStorage.getItem("token")
    },{responseType: 'text'}).subscribe( res => {
      console.log(res)
      this.completo=true;
      document.getElementById('cerrarModall')?.click();
      setTimeout(() => {
        this.completo=false;
      },3500);
      this.estudiosForm.reset();
    },
    (error:any) => {
      console.log(error)
    })
      }
      else {
        this.httpClient.post("http://localhost:8080/personas/crearEducacion/", {
      titulo:this.estudiosForm.value.titulo,
      institucion:this.estudiosForm.value.institucion,
      url_img:this.estudiosForm.value.imgUrl,
      descripcion:this.estudiosForm.value.descripcion,
      fechaInicio:this.estudiosForm.value.fechaInic,
      fechaFin:this.estudiosForm.value.fechaFin,
      url_cert:this.estudiosForm.value.urlCert,
      token: localStorage.getItem("token")
    },{responseType: 'text'}).subscribe( res => {
      console.log(res)
      this.completo=true;
      document.getElementById('cerrarModall')?.click();
      setTimeout(() => {
        this.completo=false;
      },3500);
      this.estudiosForm.reset();
    },
    (error:any) => {
      console.log(error)
    })
      }
    }
    else {
      this.httpClient.post("http://localhost:8080/personas/crearEducacion/", {
      titulo:this.estudiosForm.value.titulo,
      institucion:this.estudiosForm.value.institucion,
      url_img:this.estudiosForm.value.imgUrl,
      descripcion:this.estudiosForm.value.descripcion,
      fechaInicio:this.estudiosForm.value.fechaInic,
      fechaFin:'En curso',
      url_cert:'',
      token: localStorage.getItem("token")
    },{responseType: 'text'}).subscribe( res => {
      console.log(res)
      this.completo=true;
      document.getElementById('cerrarModall')?.click();
      setTimeout(() => {
        this.completo=false;
      },3500);
      this.estudiosForm.reset();
    },
    (error:any) => {
      console.log(error)
    })
    }
    window.location.reload()
  }
  eliminar(id:any) {
    this.httpClient.delete('http://localhost:8080/eliminarEducacion/'+localStorage.getItem('token'), {responseType: 'text',body: id }).subscribe(res => console.log(res))
    window.location.reload()
  }
}
