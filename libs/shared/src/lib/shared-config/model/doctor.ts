import { Especialidad } from "./especialidad";
import { Persona } from "./personData";

export class Doctor {
    idDoctor?: number;
    numeroColegiado: string;
    idEspecialidad: number;
    persona: Persona;
    especialidad: Especialidad;
  
    constructor() {
      this.idDoctor = 0;
      this.numeroColegiado = '';
      this.idEspecialidad = 0;
      this.persona = new Persona();
      this.especialidad = new Especialidad();
    }
}  