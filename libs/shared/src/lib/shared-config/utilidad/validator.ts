import { Persona } from "../model/personData";

export class ValidatorForm {
    public isFormValidPerson(model: Persona): boolean {
        return (
          model.nombres.trim() !== '' &&
          model.primerApellido.trim() !== '' &&
          model.cedula.trim() !== '' &&
          model.telefono.trim() !== '' &&
          this.isValidateEmail(model.email)
        );
    }
    
    private isValidateEmail(email: string): boolean {
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailPattern.test(email);
    }
}