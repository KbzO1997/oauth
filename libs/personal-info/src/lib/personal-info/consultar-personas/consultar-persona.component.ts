import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { Usuario, Util } from '@oauth/shared-config';
import { PersonalService } from '../personal.service';
import { InputTextModule } from 'primeng/inputtext';
import { Router } from '@angular/router';
import { DialogModule } from 'primeng/dialog';
import { RegisterDialogComponent } from '../register-dialog/register-dialog.component';
@Component({
  selector: 'app-consultar-personas',
  standalone: true,
  imports: [CommonModule, 
    TableModule, 
    ButtonModule,
    InputTextModule, 
    DialogModule,
    RegisterDialogComponent
  ],
  templateUrl: './consultar-persona.component.html'
})
export class ConsultarPersonasComponent implements OnInit{
  
  util: Util = new Util();
  listUsuario!: Usuario[];

  usuario: Usuario = new Usuario();  
  dialog = false;
  @ViewChild('registerDialog') registerDialog!: RegisterDialogComponent;
  
  constructor(private serv: PersonalService, private router: Router) {  }

  ngOnInit() {
    this.envConsultUsuarios();
  }

  envConsultUsuarios(): void {
    try {
      this.serv.envConsultTransactionUser().subscribe({next: (resp) => {
        this.listUsuario = resp;
      }});
    } catch (error) {
      console.log(error);
    }    
  }

  btnEnvInactiveRequest(id: number){
    const modelo = this.listUsuario?.find(item => item.id === id);
    if (modelo) {
      modelo.estado = 'I';
      this.serv.envActualizarTransaction(modelo).subscribe((res) =>{
        this.util.validResponse(res);
      },(err) => {
        this.util.NotificationError('Lo sentimos. : ' + err);
      });  
    }      
  }

  btnEnvEditRequest(id: number){
    this.router.navigate(['/personal-info/actualizar-informacion', id]);
  }

  btnOpenModal(){   
    this.dialog = true;
  }

  resetForm() {
    if (this.registerDialog) {
      this.registerDialog.resetForm();
    }
  }

  exportarPdf() {
    const columnas = ['persona.nombres', 'persona.primerApellido', 'persona.segundoApellido', 'persona.cedula', 'username', 'persona.contacto', 'rol'];
    const headers = ['Nombres', 'Apellido Paterno', 'Apellido Materno', 'Cédula', 'Usuario', 'Contacto', 'Rol'];     
    this.util.exportarPDF(this.listUsuario, columnas, headers, 'Reporte_Personas');
  }
}
