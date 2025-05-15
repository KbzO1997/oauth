import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment, HttpUtil, RsTrxService, Tratamiento } from '@oauth/shared-config';

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class TratamientoService {
  private endPoint = environment.endPointOTC;

  constructor(private httpService: HttpUtil) {}

  envConsultTransaction():Observable<Tratamiento[]>{
    return this.httpService.get<Tratamiento[]>(`${this.endPoint}tratamiento/consult`);
  }
  
  envConsultTransactionId(id:number):Observable<Tratamiento>{
    return this.httpService.get<Tratamiento>(`${this.endPoint}tratamiento/consultId/${id}`);
  }
    
  envRegistarTransaction(modelo:Tratamiento):Observable<RsTrxService>{
    return this.httpService.post<RsTrxService>(`${this.endPoint}tratamiento/register`, modelo);
  }

  envActualizarTransaction(modelo:Tratamiento):Observable<RsTrxService>{
    return this.httpService.put<RsTrxService>(`${this.endPoint}tratamiento/update`, modelo);
  }

  envDeleteTransactionId(id:number):Observable<Tratamiento>{
    return this.httpService.get<Tratamiento>(`${this.endPoint}tratamiento/delete/${id}`);
  }
}