import { Marcas } from "./Marca";
import { Tipos } from "./Tipo";

export class Coches {
    id_coche: number;
    matricula: string;
    num_puertas: number;
    id_marca: Marcas;
    id_tipo: Tipos;

    constructor(id_coche: number, matricula: string, num_puertas: number, id_marca: Marcas, id_tipo: Tipos){
        this.id_coche = id_coche;
        this.matricula = matricula;
        this.num_puertas = num_puertas;
        this.id_marca = id_marca;
        this.id_tipo = id_tipo;
    }
}
