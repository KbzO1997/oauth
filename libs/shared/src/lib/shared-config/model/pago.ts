import { Cita } from "./cita";

export class Pago {
    id_pago?: number;
    id_cita?: number;
    fechaPago: string;
    metodoPago: string;
    monto?: number;
    estadoPago: 'Pendiente' | 'Confirmada' | 'Cancelada' | 'Pagado';
    referenciaPago: string;    
    cita?: Cita; 
  
    constructor() {
      this.id_pago = 0;
      this.id_cita = 0;
      this.fechaPago = ''; 
      this.metodoPago = ''; 
      this.monto = 0;
      this.estadoPago = 'Pagado';
      this.referenciaPago = '';      
      this.cita = new Cita();
    }
}  