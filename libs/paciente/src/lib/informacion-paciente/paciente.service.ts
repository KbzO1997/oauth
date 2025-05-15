import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment, HttpUtil, RsTrxService, Paciente } from '@oauth/shared-config';

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class PacienteService {
  private endPoint = environment.endPointOTC;

  constructor(private httpService: HttpUtil) {}

  envConsultTransaction():Observable<Paciente[]>{
    return this.httpService.get<Paciente[]>(`${this.endPoint}paciente/consult`);
  }

  envConsultTransactionIdPersonPaciente(cedula:string):Observable<Paciente>{
    return this.httpService.get<Paciente>(`${this.endPoint}paciente/consultPacienteForCedula/${cedula}`);
  }
  
  envConsultTransactionId(id:number):Observable<Paciente>{
    return this.httpService.get<Paciente>(`${this.endPoint}paciente/consultId/${id}`);
  }

  envConsultTransactionIdPerson(id:number):Observable<number>{
    return this.httpService.get<number>(`${this.endPoint}personuser/consultPersonIdPersona/${id}`);
  }  
    
  envRegistarTransaction(modelo:Paciente):Observable<RsTrxService>{
    return this.httpService.post<RsTrxService>(`${this.endPoint}paciente/register`, modelo);
  }

  envActualizarTransaction(modelo:Paciente):Observable<RsTrxService>{
    return this.httpService.put<RsTrxService>(`${this.endPoint}paciente/update`, modelo);
  }
}