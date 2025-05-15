export class Tratamiento {
    idTratamiento?: number;
    nombre: string;
    costo?: number;
    estado: string;
    constructor() {
        this.idTratamiento = 0;
        this.nombre = '';
        this.costo = 0;
        this.estado = '';
    }
}