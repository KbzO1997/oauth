import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ArchivoPaciente, environment, HttpUtil, RsTrxService } from '@oauth/shared-config';

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class ArchivoService {
  private endPoint = environment.endPointOTC;

  constructor(private httpService: HttpUtil) {}

  envConsultTransaction():Observable<ArchivoPaciente[]>{
    return this.httpService.get<ArchivoPaciente[]>(`${this.endPoint}archivo/consult`);
  }
  
  envConsultTransactionId(id:number):Observable<ArchivoPaciente[]>{
    return this.httpService.get<ArchivoPaciente[]>(`${this.endPoint}archivo/consultId/${id}`);
  } 
    
  envRegistarTransaction(idCita: number, formData: FormData): Observable<RsTrxService> {
    const file = formData.get('file');
 
    if (file instanceof Blob) {
      // Si el archivo es un Blob, se puede agregar al FormData
      formData.append('id_cita', idCita.toString());
      formData.append('file', file);
    } else {
      console.error('El archivo no es válido');
    }
 
    // Agregar el objeto modelo como JSON
    //formData.append('modelo', JSON.stringify(modelo));
    console.log(formData);
    // Aquí el encabezado Content-Type no es necesario, ya que FormData se encarga de eso
    return this.httpService.post<RsTrxService>(`${this.endPoint}archivo/register`, formData);
 }
 

  envActualizarTransaction(modelo:ArchivoPaciente):Observable<RsTrxService>{
    return this.httpService.put<RsTrxService>(`${this.endPoint}archivo/update`, modelo);
  }
}