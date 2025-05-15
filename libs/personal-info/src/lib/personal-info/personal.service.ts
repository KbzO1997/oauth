import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment, HttpUtil, Usuario, RsTrxService, Paciente } from '@oauth/shared-config';

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class PersonalService {
  private endPoint = environment.endPointOTC;
  private endPointPris = environment.endPointPrisma;
  private isInvokeDb = environment.isInvokeDb;
  private contrato = (this.isInvokeDb === 'SQL') ? `${this.endPoint}personuser/consultPersonId` : `${this.endPointPris}persona`;
  

  constructor(private httpService: HttpUtil) {}

  /*TODO: PRISMA initialize endpoint: persona*/
  envConsultTransactionUser():Observable<Usuario[]>{
    return this.httpService.get<Usuario[]>(`${this.endPoint}personuser/consultPerson`);
  }
  
  envConsultTransactionUserId(id:number):Observable<Usuario>{
    return this.httpService.get<Usuario>(`${this.endPoint}personuser/consultPersonId/${id}`);
  }
    
  envConsultTransactionIdPerson(id:number):Observable<number>{
    return this.httpService.get<number>(`${this.endPoint}personuser/consultPersonIdPersona/${id}`);
  }
  
  envRegistarTransaction(modelo:Usuario):Observable<RsTrxService>{
    this.contrato = (this.isInvokeDb === 'SQL') ? `${this.endPoint}personuser/registerUser` : `${this.endPointPris}persona`;
    return this.httpService.post<RsTrxService>(`${this.contrato}`, modelo);
  }

  envActualizarTransaction(modelo:Usuario):Observable<RsTrxService>{
    this.contrato = (this.isInvokeDb === 'SQL') ? `${this.endPoint}personuser/updateUser` : `${this.endPointPris}persona`;
    return this.httpService.put<RsTrxService>(`${this.contrato}`, modelo);
  }
}