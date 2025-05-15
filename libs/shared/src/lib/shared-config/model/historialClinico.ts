import { Paciente } from "./paciente";

export class HistorialClinico {
    id_historial?: number;
    id_paciente!: number;
    tratamientoMedico?: boolean;
    propensoHemorragia?: boolean;
    alergiaMedica!: string;
    hipertenso?: boolean;
    diabetico?: boolean;
    estado?: string;
    paciente!: Paciente;

    constructor() {
        this.id_paciente = 0;
        this.tratamientoMedico = false;
        this.propensoHemorragia = false;
        this.alergiaMedica = '';
        this.hipertenso = false;
        this.diabetico = false;
        this.estado = 'A';
        this.paciente = new Paciente();
    }
}
  