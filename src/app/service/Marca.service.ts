import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Marcas } from '../models/Marca';

@Injectable({
  providedIn: 'root'
})
export class MarcasService {
  private apiUrl="http://localhost:8080/api/marcas"
  constructor(private http: HttpClient) { }

  getMarcas():Observable<Marcas[]>{
    return this.http.get<Marcas[]>(this.apiUrl);
  }
  getMarcasById(id_marca:number):Observable<Marcas>{
    return this.http.get<Marcas>(`${this.apiUrl}/${id_marca}`);
  }
  crearMarcas(marcas: Marcas):Observable<Marcas>{
    return this.http.post<Marcas>(this.apiUrl,marcas);
  }
  editarMarcas(marcas: Marcas):Observable<Marcas>{
    return this.http.post<Marcas>(this.apiUrl,marcas);
  }
  deleteMarcas(id_marca: number){
    return this.http.delete(`${this.apiUrl}/${id_marca}`);
  }
}
