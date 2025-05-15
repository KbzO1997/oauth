import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { FormsModule, NgForm } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import {
  Doctor,
  Especialidad,
  StatusCode,
  Util,
  ValidatorForm,
} from '@oauth/shared-config';
import { BadgeModule } from 'primeng/badge';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { DoctorService } from '../doctor.service';
@Component({
  selector: 'app-asignar-dialog',
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
  templateUrl: './asignar-dialog.component.html',
  providers: [MessageService],
})
export class AsignarDialogComponent {
  util: Util = new Util();
  model: Doctor = new Doctor();
  validator: ValidatorForm = new ValidatorForm();
  msgError: string | undefined;
  @ViewChild('formulario') formulario!: NgForm;
  @Input() id = 0;
  items: Especialidad[] = [];
  constructor(
    private serv: DoctorService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.envConsultEspecialidad();
  }

  /*ngOnInit() {
    this.envConsultEspecialidad();
  }*/

  envConsultEspecialidad(): void {
    this.serv.envConsultTransactionEspecialidad().subscribe({
      next: (resp) => {
        this.items = resp;
      },
    });
  }

  btnEnvRequest(): void {
    this.model.persona.id = this.id;
    this.model.especialidad.idEspecialidad = this.model.idEspecialidad;
    
    this.serv.envRegistarTransaction(this.model).subscribe(
      (res) => {
        this.util.validResponse(res);
        if (res.status == StatusCode.SUCCESS) {
          this.router.navigateByUrl('/personal-info/consultar-personas');
        }
      },
      (err) => {
        this.util.NotificationError(err.error?.message);
      }
    );
  }
}
