import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth.service';
import { PorfolioService } from 'src/app/servicios/porfolio.service';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})

export class SkillsComponent implements OnInit {
  funcionDePrueba = (x:any) => {
    console.log(x)
  }


  constructor(private datosPorfolio:PorfolioService, private formbuilder:FormBuilder,private http:HttpClient, public authService:AuthService) {
    this.tecnologiaForm=this.formbuilder.group({
      titulo:["",Validators.required],
      url_img:[""],
      nivel:["0",Validators.required]
    })
   }
   tecnologiaForm:FormGroup;
  tecnologiaList:any= [];
  actSkill:boolean=true
  ngOnInit(): void {
    if (this.authService.logIn) {
      this.datosPorfolio.infoTecnologia(localStorage.getItem('token')).subscribe( res => {
        this.tecnologiaList=res;
      })
    }
    else {
      this.datosPorfolio.obtenerDatos().subscribe(data => {
        this.tecnologiaList=data.tecnologias;
        }
      )
    }
  }

  titulo:string=""
  nivel:string=""
  url_img:string=""

  actSkills() {
    this.actSkill=!this.actSkill
  }

  agregarTecnologia() {
    this.http.post('http://localhost:8080/agregarTecnologia/'+localStorage.getItem('token'), {
      titulo:this.tecnologiaForm.value.titulo,
      nivel:this.tecnologiaForm.value.nivel,
      url_img:this.tecnologiaForm.value.url_img,
      usuario_id:""
    }).subscribe( res => {
      this.tecnologiaForm.reset()
      window.location.reload()
    })
  }
  eliminarTecnologia(id:string) {
    this.http.delete('http://localhost:8080/eliminarTecnologia/'+id, {responseType: 'text', body :localStorage.getItem('token')}).subscribe((res:any) => {
      console.log(res);
      window.location.reload();
    })
  }
  getValue(e:Event) {
    return (e.target as HTMLInputElement).value
  }
}
