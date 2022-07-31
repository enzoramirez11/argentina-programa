import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormService } from 'src/app/servicios/form.service';
import { AuthService } from 'src/app/auth.service';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import {Router} from "@angular/router"

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public errorLogin:boolean;
  public resp:any = [];
  public login:FormGroup;
  public register:FormGroup;
  public pruebaaa:boolean=false;
  public RegistroErroneo:boolean=false;
  public RegistroExitoso:boolean=false;
  public prueba:boolean = false;
  public error:boolean;
  public loading:boolean;
  public estaRegistrado:boolean=true;
  public emailYaExiste = (httpClient:HttpClient) => (c:FormControl) => {
    if (!c || String(c.value).length===0) {
      return of(null);      
    }
    return httpClient.get('http://localhost:8080/personas/mail/'+String(c.value))
    .pipe(
      map( res => {
        return res ? {color:true} : null;
      })
    )
  }
  

  constructor(private authService:AuthService ,private formService:FormService, private formBuilder:FormBuilder, private httpClient:HttpClient, private router:Router) {
    this.login = this.formBuilder.group({
      email: ["",Validators.compose([Validators.required, Validators.email])],
      password: [""]
    });
    this.register= this.formBuilder.group({
      nombre: ["",Validators.required],
      apellido: ["",Validators.required],
      email:["",Validators.compose([Validators.required, Validators.email])],
      password:["",Validators.compose([Validators.required, Validators.minLength(6)])]
    })
   }
  
  ngOnInit(): void {  }


  get RegisterPassword() {
    return this.register.get("password");
  }
  get RegisterEmail() {
    return this.register.get("email");
  }
  get RegisterApellido() {
    return this.register.get("apellido");
  }
  get RegisterNombre() {
    return this.register.get("nombre");
  }

  Login() {
    this.loading=true;
    this.errorLogin=false;
    //prueba------------
    this.httpClient.post("http://localhost:8080/personas/login",
      {
        "email":this.login.value.email,
        "password":this.login.value.password
      })
      .subscribe( (resp:any) => {
        console.log(resp.mensaje)
        if (resp.estaRegistrado) {
          localStorage.setItem('token',resp.token);          
          this.router.navigate(['perfil/mi-cuenta']);
          document.getElementById('cerrarModal')?.click()
          this.login.reset()
        }
        else {          
          this.estaRegistrado=false;
        }
        
      
      },
      (error:any)=> {
        console.log(error);
        this.errorLogin=true;
        this.loading=false;
        setTimeout(() => {
          this.errorLogin=false
        }, 3000);
      }, () => {
        console.log('en teoria termino')
        
        this.loading=false;
      })
  }


  Register() {
    this.loading=true;
    this.httpClient.post<boolean>("http://localhost:8080/registro",
    {
      'nombre':this.register.value.nombre,
      'apellido':this.register.value.apellido,
      'email':this.register.value.email,
      'password':this.register.value.password
    }).subscribe((res:boolean) => {
      this.loading=false;
      if(!res) {
        this.RegistroErroneo=true;
      }
      else {
        this.RegistroExitoso=true;
        this.register.reset();
      }
    },
    (error:any) => {
      this.loading=false;
      this.error=true;
      console.log(error)
    });
  }

  reinicio() {
    this.RegistroErroneo=false;
    this.RegistroExitoso=false;
    this.error=false;
  }
}
