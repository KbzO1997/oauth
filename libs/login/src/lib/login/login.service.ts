import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  AuthenticationRq,
  environment,
  HttpUtil,
  RqUsuario,
  RsTrxService,
} from '@oauth/shared-config';

@Injectable({
  providedIn: 'root',
})
@Injectable()
export class LoginService {
  private endPoint = environment.endPointOTC;
  private endPointPrisma = environment.endPointPrisma;

  constructor(private http: HttpClient, private httpService: HttpUtil) {}

  envTokenTransaction(modelo: AuthenticationRq): Observable<RsTrxService> {
    return this.http.post<RsTrxService>(
      `${this.endPoint}OTC/authentication/login`, 
      modelo
    );
  }

  envLoginTransaction(modelo: AuthenticationRq): Observable<RsTrxService> {
    return this.http.post<RsTrxService>(
      `${this.endPoint}OTC/authentication/login`,
      modelo
    );
  }

  envRecordarTransaction(modelo: RqUsuario): Observable<RsTrxService> {
    return this.httpService.post<RsTrxService>(
      `${this.endPoint}rememberPassword`,
      modelo
    );
  }

  envDesbloquearTransaction(modelo: RqUsuario): Observable<RsTrxService> {
    return this.httpService.post<RsTrxService>(
      `${this.endPoint}unlockUser`,
      modelo
    );
  }

  envPrismaLogin(modelo: RqUsuario): Observable<RsTrxService> {
    return this.http.post<RsTrxService>(`${this.endPointPrisma}login`, modelo);
  }
}
