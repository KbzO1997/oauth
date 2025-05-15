import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment, HttpUtil, RsTrxService, Pago } from '@oauth/shared-config';

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class PagoService {
  private endPoint = environment.endPointOTC;

  constructor(private httpService: HttpUtil) {}
  
  envConsultTransaction():Observable<Pago[]>{
    return this.httpService.get<Pago[]>(`${this.endPoint}pago/consult`);
  }
  
  envConsultTransactionId(id:number):Observable<Pago>{
    return this.httpService.get<Pago>(`${this.endPoint}pago/consultId/${id}`);
  }
    
  envRegistarTransaction(modelo:Pago):Observable<RsTrxService>{
    return this.httpService.post<RsTrxService>(`${this.endPoint}pago/register`, modelo);
  }

  envActualizarTransaction(modelo:Pago):Observable<RsTrxService>{
    return this.httpService.put<RsTrxService>(`${this.endPoint}pago/update`, modelo);
  }
}
