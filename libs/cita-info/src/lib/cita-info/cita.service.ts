import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment, HttpUtil, RsTrxService, Tratamiento, Cita } from '@oauth/shared-config';

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class CitaService {
  private endPoint = environment.endPointOTC;

  constructor(private httpService: HttpUtil) {}

  envConsultTransactionTratamiento():Observable<Tratamiento[]>{
    return this.httpService.get<Tratamiento[]>(`${this.endPoint}doctor/consult/tratamientos`);
  }
  
  envConsultTransaction():Observable<Cita[]>{
    return this.httpService.get<Cita[]>(`${this.endPoint}cita/consult`);
  }

  envConsultNotificacionTransaction(id:number):Observable<Cita[]>{
    return this.httpService.get<Cita[]>(`${this.endPoint}cita/consultNotificacionDoctorId/${id}`);
  }
  
  envConsultTransactionId(id:number):Observable<Cita>{
    return this.httpService.get<Cita>(`${this.endPoint}cita/consultId/${id}`);
  }
    
  envRegistarTransaction(modelo:Cita):Observable<RsTrxService>{
    return this.httpService.post<RsTrxService>(`${this.endPoint}cita/register`, modelo);
  }

  envActualizarTransaction(modelo:Cita):Observable<RsTrxService>{
    return this.httpService.put<RsTrxService>(`${this.endPoint}cita/update`, modelo);
  }

  envPayTransaction():Observable<any>{
    return this.httpService.post<any>(`${this.endPoint}paypal/pay`, {});
  }
}
