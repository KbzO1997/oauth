/*export interface Tooth {

  id: number;
  type: string;
  position: string;
  quadrant: number;
  status: string;
  }*/

  export class Tooth {
    id_tooth?: number;
    tipo: string;
    position: string;
    quadrant: number;
    estado: string;
    id?: number;
    constructor() {
      this.tipo = '';
      this.position = '';
      this.quadrant = 0;
      this.estado = '';
    }
  }
  