import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { FormsModule, NgForm } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import {
  AuthenticationRq,
  StatusCode,
  Usuario,
  Util,
  ValidatorForm,
} from '@oauth/shared-config';

import { BadgeModule } from 'primeng/badge';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { PacienteService } from '../paciente.service';

@Component({
  selector: 'app-registrar-paciente',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    InputTextModule,
    FormsModule,
    DialogModule,
    InputTextareaModule,
    DropdownModule,
    BadgeModule,
    ToastModule,
    ],
  templateUrl: './registrar-paciente.component.html',
  providers: [MessageService],
})
export class RegistrarPacienteComponent {
 util: Util = new Util();
  usuario: Usuario = new Usuario();
  validator: ValidatorForm = new ValidatorForm();
  msgError: string | undefined;
  auth: AuthenticationRq = new AuthenticationRq();

  @ViewChild('formulario') formulario!: NgForm;
  @Output() registroExitoso = new EventEmitter<void>();

  constructor(
    private serv: PacienteService,
    private messageService: MessageService,
    private router: Router
  ) {}
  btnEnvRequest(): void {
    this.usuario.persona.pais = this.usuario.contrasenia;
    this.usuario.rol = 'PACIENTE';
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

  msgService(msg: string, severity: string) {
    this.messageService.add({ severity: severity, summary: msg, life: 3000 });
  }
}

