import { Component, OnInit } from '@angular/core';
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

  miPorfolio:any

  constructor(private datosPorfolio:PorfolioService) { 
    
   }
  skillList:any;    
  ngOnInit(): void {
    this.datosPorfolio.obtenerDatos().subscribe(data => {
      this.skillList=data.skills
      }
    )
  }
}
