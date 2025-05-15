import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment, HttpUtil, RsTrxService, Paciente, Usuario, Especialidad, Doctor, Tratamiento } from '@oauth/shared-config';

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class DoctorService {
  private endPoint = environment.endPointOTC;

  constructor(private httpService: HttpUtil) {}

  /*envConsultTransactionUser():Observable<Usuario[]>{
    return this.httpService.get<Usuario[]>(`${this.endPoint}personuser/consultPerson`);
  }*/

  envConsultTransactionEspecialidad():Observable<Especialidad[]>{
    return this.httpService.get<Especialidad[]>(`${this.endPoint}doctor/consult/especialidades`);
  }

  envConsultTransactionTratamiento():Observable<Tratamiento[]>{
    return this.httpService.get<Tratamiento[]>(`${this.endPoint}doctor/consult/tratamientos`);
  }

  
  
  envConsultTransaction():Observable<Doctor[]>{
    return this.httpService.get<Doctor[]>(`${this.endPoint}doctor/consult`);
  }
  
  envConsultTransactionId(id:number):Observable<Doctor>{
    return this.httpService.get<Doctor>(`${this.endPoint}paciente/consultId/${id}`);
  }
    
  envRegistarTransaction(modelo:Doctor):Observable<RsTrxService>{
    return this.httpService.post<RsTrxService>(`${this.endPoint}doctor/register`, modelo);
  }

  envActualizarTransaction(modelo:Paciente):Observable<RsTrxService>{
    return this.httpService.put<RsTrxService>(`${this.endPoint}doctor/update`, modelo);
  }
}