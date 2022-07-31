import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export class Persona {
  id:number;
  nombre:string;
  apellido:string;
  sobre_mi:string;
  ocupacion:string;
  url_foto:string;  
}
export class Usuario {
  email:string;
  password:string;
}

@Injectable({
  providedIn: 'root'
})
export class PorfolioService {

  constructor(private http:HttpClient) { }
  obtenerDatos():Observable<any> {
    return this.http.get("./assets/data/data.json")
  }
  
  datosUsuario(token:string|null):Observable<any> {
    return this.http.get('http://localhost:8080/datosUsuario/'+token)
  }

  infoPersonal(token:string|null):Observable<any> {
    return this.http.get('http://localhost:8080/infoMiCuenta/'+token,{responseType: 'text'})
  }
  infoContacto(token:string|null):Observable<any> {
    return this.http.get('http://localhost:8080/infoContacto/'+token)
  }
  infoEstudios(token:string|null):Observable<any> {
    return this.http.get('http://localhost:8080/infoEducacion/'+token)
  }
  infoTecnologia(token:string|null):Observable<any> {
    return this.http.get('http://localhost:8080/infoTecnologia/'+token)
  }
}
