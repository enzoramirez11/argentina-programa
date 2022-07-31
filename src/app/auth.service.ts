import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router"
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate {
  
  url:string = "http://localhost:8080/personas/login"
  emailYaExiste:boolean;
  token:any;
  prueba:any;
  error:boolean=false;
  loading:boolean=true;
  
  constructor(private http: HttpClient, private router: Router) { }

  logout() {
    this.router.navigate(['/']);    
    localStorage.removeItem('token');
    this.token=null;
    setTimeout(() => {
      window.location.reload();
    }
    ,400)
    
  }
  public get logIn(): boolean {
    return (localStorage.getItem('token') !== null)
  }
  
  async auth() {    
    let tokken=localStorage.getItem('token');
    var res= await this.http.get<boolean>("http://localhost:8080/personas/auth/" + tokken).toPromise()
    console.log(res)
    if (res) {
      return res;
    }
    else{
      return false
    }
  }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    
    return this.auth()
  }
  
}
