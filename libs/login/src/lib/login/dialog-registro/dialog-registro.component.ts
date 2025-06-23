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
import { switchMap } from 'rxjs/operators';

import { BadgeModule } from 'primeng/badge';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { PersonalService } from '../personal.service';
import { LoginService } from '../login.service';
@Component({
  selector: 'app-dialog-registro',
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
  templateUrl: './dialog-registro.component.html',
  providers: [MessageService],
})
export class DialogRegistroComponent {
  util: Util = new Util();
  usuario: Usuario = new Usuario();
  validator: ValidatorForm = new ValidatorForm();
  msgError: string | undefined;
  auth: AuthenticationRq = new AuthenticationRq();

  @ViewChild('formulario') formulario!: NgForm;
  @Output() registroExitoso = new EventEmitter<void>();

  constructor(
    private serv: PersonalService,
    private servL: LoginService,
    private messageService: MessageService,
    private router: Router
  ) {}
  btnEnvRequest(): void {
    this.usuario.persona.pais = this.usuario.contrasenia;
    this.usuario.rol = 'PACIENTE';

    this.auth.username = 'test';
    this.auth.password = '1234';

    this.servL
      .envLoginTransaction(this.auth)
      .pipe(
        switchMap((resp) => {
          sessionStorage.setItem('token', resp.token);
          return this.serv.envRegistarTransaction(this.usuario);
        })
      )
      .subscribe(
        (res) => {
          if (res.status == StatusCode.SUCCESS) {
            this.util.validResponse(res);
            this.registroExitoso.emit();
            this.router.navigateByUrl('/principal');
          } else {
            this.msgService(res.message, 'error');
          }
        },
        (err) => {
          this.util.NotificationError(err.error.message);
        }
      );
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
