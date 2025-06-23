import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { Paciente, Util } from '@oauth/shared-config';
import { PacienteService } from './paciente.service';
import { Router } from '@angular/router';
import { DialogModule } from 'primeng/dialog';
import { HistorialInfoComponent } from './historial-info/historial-info.component';
import { ConsultarHistorialInfoComponent } from './consultar-historial-info/consultar-historial-info.component';
import { RegistrarPacienteComponent } from './registrar-paciente/registrar-paciente.component';

@Component({
  selector: 'app-informacion-paciente',
  standalone: true,
  imports: [CommonModule, 
    TableModule, 
    ButtonModule,
    InputTextModule,
    DialogModule,
    HistorialInfoComponent,
    ConsultarHistorialInfoComponent,
    RegistrarPacienteComponent
  ],
  templateUrl: './informacion-paciente.component.html'
})
export class InformacionPacienteComponent implements OnInit{
  
  util: Util = new Util();
  list!: Paciente[];
  model: Paciente = new Paciente();  
  dialog = false;
  id!: number;
  modo = '';
  
  @ViewChild('registerDialog') registerDialog!: HistorialInfoComponent;

  dialogPerson = false;
  @ViewChild('registerPersonDialog') registerPersonDialog!: RegistrarPacienteComponent;
  
  constructor(private serv: PacienteService, private router: Router) {  }

  ngOnInit() {
    this.envConsultAll();
  }

  envConsultAll(): void {
    try {
      this.serv.envConsultTransaction().subscribe({next: (resp) => {
        this.list = resp;
        console.log(resp);
      }});
    } catch (error) {console.log(error);}    
  }

  btnEnvRequest(id: number) {
    this.router.navigate(["/informacion-paciente/registrar-paciente", id]);
  }  

  btnEnvEditRequest(id: number){    
    this.serv.envConsultTransactionIdPerson(id).subscribe({next: (resp) => {      
      this.router.navigate(['/personal-info/actualizar-informacion', resp]);
    }});   
  }

  resetForm() {
    console.log('resetForm');
  }

  btnOpenModal(id: number, modo: string){  
    this.dialog = true;
    this.id = id;
    this.modo = modo;
  }

  exportarPdf() {
    const columnas = ['persona.nombres', 'persona.primerApellido', 'persona.segundoApellido', 'persona.cedula', 'persona.telefono', 'persona.email', 'persona.contacto'];
    const headers = ['Nombres', 'Apellido Paterno', 'Apellido Materno', 'Cédula', 'Teléfono', 'E-Mail', 'Contacto',];     
    this.util.exportarPDF(this.list, columnas, headers, 'Reporte_Pacientes');
  }

  btnOpenModalPerson(){   
    this.dialogPerson = true;
  }

  resetForm() {
    if (this.dialogPerson) {
      this.registerPersonDialog.resetForm();
    }
  }
  
}