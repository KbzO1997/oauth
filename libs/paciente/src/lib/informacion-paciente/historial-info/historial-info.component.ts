import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { HistorialClinico, Paciente, StatusCode, Util } from '@oauth/shared-config';
import { Router } from '@angular/router';

import { FormsModule, NgForm } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { HistorialService } from '../historial.service';

@Component({
  selector: 'app-historial-info',
  standalone: true,
  imports: [CommonModule, 
    TableModule, 
    ButtonModule,
    InputTextModule,
    FormsModule,
    DialogModule,
    InputTextareaModule,
    DropdownModule,
  ],
  templateUrl: './historial-info.component.html'
})
export class HistorialInfoComponent{ //implements OnInit{
  
  util: Util = new Util();
  list!: Paciente[];
  model: HistorialClinico = new HistorialClinico(); 
  @Input() id = 0;
  @Output() registroExitoso = new EventEmitter<void>();
   
  items = [
    { name: true, code: 'Si' },
    { name: false, code: 'No' }
  ];

  frecuencia = [
    { name: 'Una vez al día'},
    { name: 'Dos veces al día'},
    { name: 'Tres veces al día'},
    { name: 'Después de cada comida'},
    { name: 'Solo en la mañana'},
    { name: 'Solo en la noche'},
    { name: 'Menos de una vez al día'},
    { name: 'No se cepilla'},
  ];

  constructor(private serv: HistorialService, private router: Router) {  }

  btnEnvRequest(): void {   
    this.model.id_paciente = this.id;
    this.model.paciente.idPaciente = this.id;
    this.serv.envRegistarTransaction(this.model).subscribe((res) => {
      this.registroExitoso.emit();
      this.util.validResponse(res);
      if (res.status == StatusCode.SUCCESS) {
        setTimeout(() => {
          window.location.reload();
        }, 3000);          
      }
    },(err) => {
      this.util.NotificationError(err.error?.message);
    });
  } 

}