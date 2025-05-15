import { Persona } from "./personData";

export class Paciente  {
    idPaciente: number;
    numeroHistoriaClinica: number;
    persona: Persona;   

    constructor() {
        this.idPaciente = 0;
        this.numeroHistoriaClinica = 0;
        this.persona = new Persona();
    }
}