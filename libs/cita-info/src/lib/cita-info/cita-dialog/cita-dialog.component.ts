import {
  Component,
  ViewChild,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { FormsModule, NgForm } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import {
  Cita,
  Doctor,
  Paciente,
  StatusCode,
  Tratamiento,
  Util,
  ValidatorForm,
} from '@oauth/shared-config';
import { BadgeModule } from 'primeng/badge';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { DoctorService } from '@oauth/doctor-info';
import { PacienteService } from '@oauth/informacion-paciente';
import { CitaService } from '../cita.service';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-cita-dialog',
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
    TableModule,
    TooltipModule
  ],
  templateUrl: './cita-dialog.component.html',
  providers: [MessageService],
})
export class CitaDialogComponent {
  util: Util = new Util();
  model: Cita = new Cita();
  validator: ValidatorForm = new ValidatorForm();
  msgError: string | undefined;
  cedulaBuscada!: string | '';
  nombrePaciente = '';
  @ViewChild('formulario') formulario!: NgForm;
  @Input() id = 0;
  @Output() registroExitoso = new EventEmitter<void>();

  items: Tratamiento[] = [];
  itemsDoc: Doctor[] = [];
  showModal = false;

  itemsEstado = [
    { name: 'Asignado', code: 'Asignado' },
    { name: 'Atendido', code: 'Atendido' },
  ];

  constructor(
    private serv: DoctorService,
    private serv_p: PacienteService,
    private serv_c: CitaService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.model.fecha = new Date().toISOString().split('T')[0]; // Resultado: '2025-04-14'
    const now = new Date();
    const horas = now.getHours().toString().padStart(2, '0');
    const minutos = now.getMinutes().toString().padStart(2, '0');
    this.model.hora = `${horas}:${minutos}`;

    this.envConsultTratamiento();
    this.envConsultDoctor();
  }

  envConsultDoctor(): void {
    this.serv.envConsultTransaction().subscribe({
      next: (resp) => {
        this.itemsDoc = resp.map((doc: any) => ({
          ...doc,
          nombreCompleto: `${doc.persona.nombres} ${doc.persona.primerApellido} ${doc.persona.segundoApellido}`,
        }));
      },
    });
  }

  envConsultTratamiento(): void {
    this.serv.envConsultTransactionTratamiento().subscribe({
      next: (resp) => {
        this.items = resp;
      },
    });
  }

  btnEnvRequest(): void {
    this.mapperPaciente();
    this.serv_c.envRegistarTransaction(this.model).subscribe(
      (res) => {
        this.util.validResponse(res);
        this.registroExitoso.emit();
        if (res.status == StatusCode.SUCCESS) {
          setTimeout(() => {
            window.location.reload();
          }, 3000);
        }
      },
      (err) => {
        this.util.NotificationError(err.error?.message);
        this.registroExitoso.emit();
      }
    );
  }

  mapperPaciente(): void {
    this.model.paciente = new Paciente();
    this.model.doctor = new Doctor();
    this.model.tratamiento = new Tratamiento();

    this.model.paciente.idPaciente = this.model.id_paciente;
    this.model.doctor.idDoctor = this.model.id_doctor;
    this.model.tratamiento.idTratamiento = this.model.id_tratamiento;
  }
  btnEnvConsult(): void {
    this.serv_p
      .envConsultTransactionIdPersonPaciente(this.cedulaBuscada)
      .subscribe({
        next: (resp) => {
          this.nombrePaciente =
            resp.persona.nombres +
            ' ' +
            resp.persona.primerApellido +
            ' ' +
            resp.persona.segundoApellido;
          this.model.id_paciente = resp.idPaciente;
        },
        error: (err) => {
          this.nombrePaciente = err.error?.message;
        },
      });
  }

  selectedTratamiento = null;

  onSelectTratamiento(tratamiento: any) {
    this.model.id_tratamiento = tratamiento.idTratamiento;
    this.showModal = false;
    this.onMethodChange(tratamiento.idTratamiento); 
  }

  getTratamientoNombre(id: number): string {
    const item = this.items.find((t) => t.idTratamiento === id);
    return item ? item.nombre : '';
  }

  onMethodChange(id: number) {
    const model = this.items.find((p) => p.idTratamiento === id);
    this.model.costo = model?.costo;
  }
}
