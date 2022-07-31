import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavabarComponent } from './componentes/navabar/navabar.component';
import { EncabezadoComponent } from './componentes/encabezado/encabezado.component';
import { EducacionComponent } from './componentes/educacion/educacion.component';
import { LoginComponent } from './componentes/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { SkillsComponent } from './componentes/skills/skills.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PerfilComponent } from './componentes/perfil/perfil.component';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { ContactoComponent } from './componentes/contacto/contacto.component';
import { MiCuentaComponent } from './componentes/perfil/mi-cuenta/mi-cuenta.component';
import { InformacionPersonalComponent } from './componentes/perfil/informacion-personal/informacion-personal.component';
import { InformacionContactoComponent } from './componentes/perfil/informacion-contacto/informacion-contacto.component';

@NgModule({
  declarations: [
    AppComponent,
    NavabarComponent,
    EncabezadoComponent,
    EducacionComponent,
    LoginComponent,
    SkillsComponent,
    PerfilComponent,
    InicioComponent,
    ContactoComponent,
    MiCuentaComponent,
    InformacionPersonalComponent,
    InformacionContactoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
