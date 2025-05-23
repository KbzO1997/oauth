
import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { Usuario, Util } from '@oauth/shared-config';
import { InputTextModule } from 'primeng/inputtext';
import { Router } from '@angular/router';
import { DialogModule } from 'primeng/dialog';
import { DoctorService } from './doctor.service';
import { AsignarDialogComponent } from './asignar-dialog/asignar-dialog.component';
import { PersonalService } from '@oauth/personal-info';

@Component({
  selector: 'app-doctor-info',
  standalone: true,
  imports: [CommonModule, 
    TableModule, 
    ButtonModule,
    InputTextModule, 
    DialogModule,
    AsignarDialogComponent
  ],
  templateUrl: './doctor-info.component.html'
})
export class DoctorInfoComponent implements OnInit{
  
  util: Util = new Util();
  listUsuario!: Usuario[];
  idPersona!: number;

  usuario: Usuario = new Usuario();  
  dialog = false;
  
  @ViewChild('registerDialog') registerDialog!: AsignarDialogComponent;
  
  constructor(private serv: DoctorService, private serv_p: PersonalService, private router: Router) {  }

  ngOnInit() {
    this.envConsultAll();
  }

  envConsultAll(): void {
    try {
      this.serv_p.envConsultTransactionUser().subscribe({next: (resp) => {
        this.listUsuario = resp.filter((user: any) => user.rol === 'DOCTOR');
      }});
    } catch (error) {
      console.log(error);
    }    
  }

  btnOpenModal(id: number){  
    this.dialog = true;
    this.idPersona = id;
  }

  resetForm() {
    console.log('resetForm');
  }

  btnEnvEditRequest(id: number){    
    this.serv_p.envConsultTransactionIdPerson(id).subscribe({next: (resp) => {      
      this.router.navigate(['/personal-info/actualizar-informacion', resp]);
    }});   
  }

  exportarPdf() {
    const columnas = ['persona.nombres', 'persona.primerApellido', 'persona.segundoApellido', 'persona.cedula', 'username', 'persona.contacto', 'persona.telefono'];
    const headers = ['Nombres', 'Apellido Paterno', 'Apellido Materno', 'Cédula', 'Usuario', 'Contacto', 'Teléfono'];     
    this.util.exportarPDF(this.listUsuario, columnas, headers, 'Reporte_Doctores');
  }

}
