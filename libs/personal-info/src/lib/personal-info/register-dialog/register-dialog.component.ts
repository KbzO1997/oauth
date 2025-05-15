import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { FormsModule, NgForm } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from "primeng/dropdown";
import { environment, StatusCode, Usuario, Util, ValidatorForm } from '@oauth/shared-config';
import { PersonalService } from '../../../../../personal-info/src/lib/personal-info/personal.service';
import { BadgeModule } from 'primeng/badge';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register-dialog',
  standalone: true,
  imports: [CommonModule,
    ButtonModule,
    InputTextModule,
    FormsModule,
    DialogModule,
    InputTextareaModule,
    DropdownModule,
    BadgeModule,
    ToastModule],
  templateUrl: './register-dialog.component.html',
  providers: [MessageService]
})
export class RegisterDialogComponent{
  util: Util = new Util();
  usuario: Usuario = new Usuario();  
  validator: ValidatorForm = new ValidatorForm();
  msgError: string | undefined;
  @ViewChild('formulario') formulario!: NgForm;
  @Output() registroExitoso = new EventEmitter<void>();

  itemsRoles = [
    { name: 'ADMIN', code: 'Admin' },
    { name: 'PACIENTE', code: 'Paciente' }, 
    { name: 'DOCTOR', code: 'Doctor' }
  ];

  constructor(private serv: PersonalService, private messageService: MessageService, private router: Router) {} 
  btnEnvRequest(): void {   
    this.deleteIdUser();
    this.usuario.persona.pais = this.usuario.contrasenia;
    this.serv.envRegistarTransaction(this.usuario).subscribe((res) => {
      if(res.status == StatusCode.SUCCESS) {
        this.util.validResponse(res);
        if (res.status == StatusCode.SUCCESS) {
          this.registroExitoso.emit();
          this.router.navigateByUrl('/personal-info/consultar-personas');
        }
      } else {
        this.msgService(res.message,'error');
      }   
    },(error) => {
      this.msgService(error.error.message,'error'); 
    });
  }


  resetForm() {
    if (this.formulario) {
      this.formulario.resetForm();
    }
  }
  
  deleteIdUser() {
    if(environment.isInvokeDb === 'P') {
      delete this.usuario.id;
      delete this.usuario.idPersona;
      delete this.usuario.persona.id;
    }
  }

  msgService(msg: string, severity: string) {
    this.messageService.add({ severity: severity, summary: msg, life: 3000 });
  } 

  onRolChange(valorRol: string) {
    if (valorRol === 'PACIENTE') {
      this.usuario.username = this.usuario.persona.cedula;
      this.usuario.contrasenia = this.usuario.persona.cedula;
    }
  }
}
