import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment, HistorialClinico, HttpUtil, RsTrxService } from '@oauth/shared-config';

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class HistorialService {
  private endPoint = environment.endPointOTC;

  constructor(private httpService: HttpUtil) {}

  envConsultTransaction():Observable<HistorialClinico[]>{
    return this.httpService.get<HistorialClinico[]>(`${this.endPoint}historialclinico/consult`);
  }
  
  envConsultTransactionId(id:number):Observable<HistorialClinico[]>{
    return this.httpService.get<HistorialClinico[]>(`${this.endPoint}historialclinico/consultId/${id}`);
  } 
    
  envRegistarTransaction(modelo:HistorialClinico):Observable<RsTrxService>{
    return this.httpService.post<RsTrxService>(`${this.endPoint}historialclinico/register`, modelo);
  }

  envActualizarTransaction(modelo:HistorialClinico):Observable<RsTrxService>{
    return this.httpService.put<RsTrxService>(`${this.endPoint}historialclinico/update`, modelo);
  }
}