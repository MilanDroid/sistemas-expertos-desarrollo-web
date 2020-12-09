import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  constructor(private httpClient: HttpClient) { }

  obtenerCategorias():Observable<any> {
    return this.httpClient.get('http://localhost:8888/categorias', {});
  }

  infoCategorias(id):Observable<any> {
    return this.httpClient.get(`http://localhost:8888/categorias/${id}`, {});
  }

  guardar(formulario):Observable<any> {
    return this.httpClient.post(`http://localhost:8888/categorias/add`,formulario.value);
    // .subscribe((res:any)=>{
    //   console.log(res);
    //   this.personas.push(res.usuarioGuardado);
    // });
  }
}
