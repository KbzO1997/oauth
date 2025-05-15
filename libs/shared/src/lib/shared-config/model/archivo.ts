import { Cita } from "./cita";

export class ArchivoPaciente {
    id?: number;
    nombreArchivo: string;
    rutaArchivo: string;    
    cita?: Cita; 
    idCita?: number;
  
    constructor() {      
      this.nombreArchivo = '';
      this.rutaArchivo = '';
      this.cita = new Cita();
    }
}  