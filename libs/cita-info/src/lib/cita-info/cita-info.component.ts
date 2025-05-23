
import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { Cita, Util } from '@oauth/shared-config';
import { Router } from '@angular/router';
import { CitaService } from './cita.service';
import { CitaDialogComponent } from './cita-dialog/cita-dialog.component';
import { DialogModule } from 'primeng/dialog';
import { TagModule } from 'primeng/tag';
import { ArchivoInfoComponent } from '@oauth/informacion-paciente';
import { MenuItem } from 'primeng/api';
import { SplitButtonModule } from 'primeng/splitbutton';
@Component({
  selector: 'app-cita-info',
  standalone: true,
  imports: [CommonModule, 
    TableModule, 
    ButtonModule,
    InputTextModule,
    DialogModule,
    CitaDialogComponent,
    TagModule,
    ArchivoInfoComponent,
    SplitButtonModule
  ],
  templateUrl: './cita-info.component.html'
})
export class CitaInfoComponent implements OnInit{
  
  util: Util = new Util();
  list!: Cita[];
  model: Cita = new Cita();  
  dialog = false;
  dialogUpload = false;
  idSeleccionado = 0;
  @ViewChild('archivoInfo') archivoInfoComponent!: ArchivoInfoComponent;
  

  
  constructor(private serv: CitaService, private router: Router) {  }

  ngOnInit() {
    this.envConsultAll();
    
  }

  envConsultAll(): void {
    try {
      this.serv.envConsultTransaction().subscribe({next: (resp) => {
        //this.list = resp;
        this.list = resp.map(model => ({
          ...model,
          menuItems: this.getActions(model) 
        }));
      }});
    } catch (error) {console.log(error);}    
  }

  btnEnvRequest(id: number) {
    this.router.navigate(["/informacion-paciente/registrar-paciente", id]);
  }

  btnOpenModal(){  
    this.dialog = true;
  }

  btnOpenModalUpload(id: number){  
    this.dialogUpload = true;
    this.idSeleccionado = id;
  }

  btnEnvEditRequest(id: number){
    const modelo = this.list?.find(item => item.id_cita === id);
    if (modelo) {
      modelo.estado = 'Cancelada';
      this.serv.envActualizarTransaction(modelo).subscribe((res) =>{
        this.util.validResponse(res);
      },(err) => {
        this.util.NotificationError('Lo sentimos. : ' + err);
      });  
    }      
  }

  btnRedirectPagar(id: number){
    this.router.navigate(["/cita-info/pago-paypal-info", id]);
  }

  btnRedirectExaminar(id: number){
    this.router.navigate(["/doctor-info/odontograma-info", id]);
  }

  btnRedirectVisualizar(id: number){ //btnRedirectVisualizar
    this.router.navigate(["/doctor-info/visualizar-odontograma-info", id]);
  }

  limpiarArchivoInfo() {
    this.archivoInfoComponent.cleanArchive();
  }

  getActions(model: any): MenuItem[] {
  return [
    {
      label: 'Cancelar',
      icon: 'pi pi-times',
      command: () => this.btnEnvEditRequest(model.id_cita)
    },
    {
      label: 'Pagar',
      icon: 'pi pi-paypal',
      command: () => this.btnRedirectPagar(model.idCita)
    },
    {
      label: 'Odontograma',
      icon: 'pi pi-folder-open',
      command: () => this.btnRedirectExaminar(model.idCita)
    },
    {
      label: 'Revisión Dental',
      icon: 'pi pi-eye',
      command: () => this.btnRedirectVisualizar(model.idCita)
    },
    {
      label: 'Subir archivo',
      icon: 'pi pi-upload',
      command: () => this.btnOpenModalUpload(model.idCita)
    }
  ];
}


}