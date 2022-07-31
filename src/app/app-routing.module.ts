import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthService } from './auth.service';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { InformacionContactoComponent } from './componentes/perfil/informacion-contacto/informacion-contacto.component';
import { InformacionPersonalComponent } from './componentes/perfil/informacion-personal/informacion-personal.component';
import { MiCuentaComponent } from './componentes/perfil/mi-cuenta/mi-cuenta.component';
import { PerfilComponent } from './componentes/perfil/perfil.component';

//rutas

const routes: Routes = [
  {path: 'perfil', component:PerfilComponent, canActivate:[AuthService],
    children:[
      {
        path:'mi-cuenta', component:MiCuentaComponent
      },
      {
        path:'informacion-personal', component:InformacionPersonalComponent
      },
      {
        path:'informacion-contacto', component:InformacionContactoComponent
      }
    ]},
  {path:'', component:InicioComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers:[AuthService],
  exports: [RouterModule]
})
export class AppRoutingModule { }
