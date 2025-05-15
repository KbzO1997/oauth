import { PeriodontalDisease } from './periodontalDisease';
import { Tooth } from './tooth';
import { ToothPiece } from './toothPiece';

export class Odontograma {
  id_cita: number;
  id_cita_tooth: number;
  estado: string;
  tooth: Tooth[];
  toothPiece: ToothPiece[];
  periodontalDisease: PeriodontalDisease;

  constructor() {
    this.id_cita = 0;
    this.id_cita_tooth = 0;
    this.estado = '';
    this.tooth = [];
    this.toothPiece = [];
    this.periodontalDisease = new PeriodontalDisease();
  }
}
