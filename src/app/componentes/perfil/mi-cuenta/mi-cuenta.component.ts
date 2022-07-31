import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { PorfolioService, Usuario } from 'src/app/servicios/porfolio.service';

@Component({
  selector: 'app-mi-cuenta',
  templateUrl: './mi-cuenta.component.html',
  styleUrls: ['./mi-cuenta.component.css']
})
export class MiCuentaComponent implements OnInit {

  constructor(private http:HttpClient,private formBuilder:FormBuilder, private porfolio:PorfolioService) {
    this.actEmail=this.formBuilder.group({
      id:[''],
      email:[this.usuario.email,Validators.compose([Validators.required,Validators.email])],
      password:[""]
    });
    this.actPassword=this.formBuilder.group({
      id:[''],
      password_actual:['',Validators.required],
      password_nuevo:['',Validators.compose([Validators.required,Validators.minLength(6)])],
      password_rep:['',Validators.required]}, {
        validators: this.checkPasswords
      })
   }
   //Forms
   actEmail:FormGroup;
   actPassword:FormGroup;
   checkPasswords: ValidatorFn = (group: AbstractControl):  ValidationErrors | null => { 
    let pass = group.get('password_nuevo')?.value;
    let confirmPass = group.get('password_rep')?.value
    return pass === confirmPass ? null : { notSame: true }
  }

  private token:string|null =localStorage.getItem('token');
  usuario:Usuario= new Usuario;
  actInfo:boolean=false;
  
  mensaje:string;
  completo:boolean=false;
  errorToast:boolean=false;

  ngOnInit(): void {
    this.obtenerMail()
  }
    
  actInfoBtn() {
    this.actInfo=!this.actInfo;    
    this.actEmail.patchValue({email:this.usuario.email? this.usuario.email : 'example@mail.com'});
  }
  obtenerMail() {
    this.porfolio.infoPersonal(this.token).subscribe((res:string) => {
      this.usuario.email=res;
    },(error:any) => {
      console.log(error)
    })
  }
  editarEmail() {
    this.http.put('http://localhost:8080/editarEmail',{
      user_id:localStorage.getItem('token'),
      email:this.actEmail.value.email,
      password:''
    }).subscribe((res:any) => {
      if (res) {
        this.mensaje="Se actualizo el mail con exito";
        this.completo=true;
        this.errorToast=false;
        console.log('en teoria se registro')
        setTimeout(() => {
          this.completo=false;
        },3500);
        this.actInfo=!this.actInfo;
      }
      else {
        this.completo=true
        this.mensaje="El mail ya se encuentra registrado";
        this.errorToast=true;
        setTimeout(() => {
          this.completo=false;
        },3500);
      }
    },(error:any) => {
      this.completo=true;
      this.mensaje="Hubo un error;"
      this.errorToast=true;
      setTimeout(() => {
        this.completo=false;
      },3500);
    },() => {
      this.obtenerMail()
      
    })
  }

  editarPassword() {
    this.http.put('http://localhost:8080/editarPassword', {
      user_id:localStorage.getItem('token'),
      password_actual:this.actPassword.value.password_actual,
      password_nuevo:this.actPassword.value.password_nuevo
    }).subscribe((res) => {
      if (res) {
        this.completo=true;
        this.errorToast=false;
        this.mensaje='Se actualizo la contraseña con exito';
        console.log(res)
      }
      else {
        this.completo=true;
        this.mensaje="Hubo un error"
        this.errorToast=true;
        console.log(res)
      }
    },()=>{},() => {
      setTimeout(() => {
        this.completo=false;
      },3500);
      this.actPassword.reset();
    })
  }
}
