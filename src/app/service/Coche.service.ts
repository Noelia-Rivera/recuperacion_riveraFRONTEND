import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Coches } from '../models/Coche';

@Injectable({
  providedIn: 'root'
})
export class CochesService {
  private apiUrl="http://localhost:8080/api/coches"
  constructor(private http: HttpClient) { }

  getCoches():Observable<Coches[]>{
    return this.http.get<Coches[]>(this.apiUrl);
  }
  getCochesById(id_coche:number):Observable<Coches>{
    return this.http.get<Coches>(`${this.apiUrl}/${id_coche}`);
  }
  crearCoches(coches: Coches):Observable<Coches>{
    return this.http.post<Coches>(this.apiUrl,coches);
  }
  editarCoches(coches: Coches):Observable<Coches>{
    return this.http.post<Coches>(this.apiUrl,coches);
  }
  deleteCoches(id_coche: number){
    return this.http.delete(`${this.apiUrl}/${id_coche}`);
  }
}
