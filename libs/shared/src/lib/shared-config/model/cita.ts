import { Doctor } from "./doctor";
import { Paciente } from "./paciente";
import { Tratamiento } from "./tratamiento";

export class Cita {
    id_cita?: number;
    id_paciente: number;
    id_doctor: number;
    id_tratamiento: number;
    fecha: string;
    hora: string;
    motivoCita: string;
    estado: 'Pendiente' | 'Confirmada' | 'Cancelada' | 'Finalizada';
    costo?: number;
    valor_pago?: number;
    paciente?: Paciente;
    doctor?: Doctor;
    tratamiento?: Tratamiento;
    idCita?: number;
  
    constructor() {
      this.id_paciente = 0;
      this.id_doctor = 0;
      this.id_tratamiento = 0;
      this.fecha = '';              // formato: 'YYYY-MM-DD'
      this.hora = '';               // formato: 'HH:mm:ss'
      this.motivoCita = '';
      this.estado = 'Pendiente';
      this.costo = 0;
      this.valor_pago = 0;
      this.paciente = new Paciente();
      this.doctor = new Doctor();
      this.tratamiento = new Tratamiento();
    }
}  