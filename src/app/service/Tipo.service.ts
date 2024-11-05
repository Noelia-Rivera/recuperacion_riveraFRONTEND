import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tipos } from '../models/Tipo';

@Injectable({
  providedIn: 'root'
})
export class TiposService {
  private apiUrl="http://localhost:8080/api/tipos"
  constructor(private http: HttpClient) { }

  getTipos():Observable<Tipos[]>{
    return this.http.get<Tipos[]>(this.apiUrl);
  }
  getTiposById(id_tipo:number):Observable<Tipos>{
    return this.http.get<Tipos>(`${this.apiUrl}/${id_tipo}`);
  }
  crearTipos(tipos: Tipos):Observable<Tipos>{
    return this.http.post<Tipos>(this.apiUrl,tipos);
  }
  editarTipos(tipos: Tipos):Observable<Tipos>{
    return this.http.post<Tipos>(this.apiUrl,tipos);
  }
  deleteTipos(id_tipo: number){
    return this.http.delete(`${this.apiUrl}/${id_tipo}`);
  }
}
