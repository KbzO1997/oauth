import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment, HttpUtil, RsTrxService, Odontograma } from '@oauth/shared-config';

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class OdontogramaService {
  private endPoint = environment.endPointOTC;

  constructor(private httpService: HttpUtil) {}
  
  envConsultTransaction():Observable<Odontograma[]>{
    return this.httpService.get<Odontograma[]>(`${this.endPoint}odontograma/consult`);
  }
  
  envConsultTransactionId(id:number):Observable<Odontograma>{
    return this.httpService.get<Odontograma>(`${this.endPoint}odontograma/consultId/${id}`);
  }
    
  envRegistarTransaction(modelo:Odontograma):Observable<RsTrxService>{
    return this.httpService.post<RsTrxService>(`${this.endPoint}odontograma/register`, modelo);
  }

  envActualizarTransaction(modelo:Odontograma):Observable<RsTrxService>{
    return this.httpService.put<RsTrxService>(`${this.endPoint}odontograma/update`, modelo);
  }
}