export class Persona {
    id?: number;
    nombres: string;
    primerApellido: string;
    segundoApellido: string;
    cedula: string;
    telefono: string;
    email: string;
    direccion: string;
    contacto: string;
    pais: string;

    constructor(id = 0, nombres = '', primerApellido = '', segundoApellido = '', cedula = '', telefono = '', email = '', direccion = '', contacto = '', pais = '') {
        this.id = id;
        this.nombres = nombres;
        this.primerApellido = primerApellido;
        this.segundoApellido = segundoApellido;
        this.cedula = cedula;
        this.telefono = telefono;
        this.email = email;
        this.direccion = direccion;
        this.contacto = contacto;
        this.pais = pais;
    }
}

export class Usuario {
    id?: number;
    username: string;
    contrasenia: string;
    rol: string;
    estado: string;
    persona: Persona;
    idPersona?: number;
    constructor() {
        this.id = 0;
        this.username = '';
        this.contrasenia = '';
        this.rol = '';
        this.estado  = 'A';
        this.idPersona = 0;
        this.persona = new Persona();
        
    }
}