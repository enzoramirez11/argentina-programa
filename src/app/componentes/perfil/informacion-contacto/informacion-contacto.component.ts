import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-informacion-contacto',
  templateUrl: './informacion-contacto.component.html',
  styleUrls: ['./informacion-contacto.component.css']
})
export class InformacionContactoComponent implements OnInit {

  formContacto:FormGroup;

  constructor(private http: HttpClient, private formBuilder:FormBuilder) {
    this.formContacto=this.formBuilder.group({
      nro_contacto:[""],
      ciudad:["",Validators.required],
      provincia:["Seleccionar",Validators.required],
      pais:["",Validators.required],
      linkedin:[""],
      github:[""]
    }, {validators: this.chek })
   }
   chek: ValidatorFn = (group:AbstractControl) : ValidationErrors | null => {
    return group.get('pais')?.value !="Seleccionar" && group.get('provincia')?.value!="Seleccionar" ? null : { notSame:true }
   }
  datos:any[]=[];
  datosEstados:any[]=[];
  paiss:any='Seleccionar';
  seleccionar:string='Seleccionar';
  completo:boolean=false;
  mensaje:string;
  errorToast:boolean=false;

  ngOnInit(): void {
    this.http.get('https://countriesnow.space/api/v0.1/countries/states').subscribe((res:any) => {
      res.data.forEach((element:any) => {
        this.datos.push(element.name)
      });
    });
  }

  editarContacto() {
    this.http.put('http://localhost:8080/editarContacto', {
      user_id:localStorage.getItem('token'),
      nro_telefono:this.formContacto.value.nro_contacto,
      ciudad:this.formContacto.value.ciudad,
      pais:this.formContacto.value.pais,
      provincia:this.formContacto.value.provincia,
      linkedin:this.formContacto.value.linkedin,
      github:this.formContacto.value.github
  }).subscribe(res => {
    this.completo=true;
    if (res) {
      this.mensaje="Se actualizo con exito"
      this.errorToast=false;
    }
    else {
      this.mensaje = "Hubo un error";
      this.errorToast=true;
    }
    setTimeout(() => {
      this.completo=false;
    },3500);
  })
  }

  pruebaa() {
    this.http.post('https://countriesnow.space/api/v0.1/countries/states',
    {
      "country":this.paiss
    }).subscribe((res:any)=> {
      this.datosEstados=[]
      res.data.states.forEach((element:any) => {
        
        this.datosEstados.push(element.name.replace(' Province',''))
        
      });
      console.log(this.datosEstados)
    })
  }
}
