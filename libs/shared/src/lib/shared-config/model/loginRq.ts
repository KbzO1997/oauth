export class RqUsuario {
  username: string;
  contrasenia: string;
  rol: string;
  pais: string;
  estado: string;

  constructor(username = '', contrasenia = '', rol = '', estado = '', pais = '') {
    this.username = username;
    this.contrasenia = contrasenia;
    this.rol = rol;
    this.estado = estado;
    this.pais = pais;
  }
}

export class RspUsuario {
  nombre: string;
  id: number;

  constructor() {
    this.nombre = '';
    this.id = 0;
  }
}
