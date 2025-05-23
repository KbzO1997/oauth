import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { HistorialClinico, Paciente, StatusCode, Util } from '@oauth/shared-config';
import { Router } from '@angular/router';
import { TagModule } from 'primeng/tag';

import { FormsModule, NgForm } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { HistorialService } from '../historial.service';

@Component({
  selector: 'app-historial-clinico',
  standalone: true,
  imports: [CommonModule, 
    TableModule, 
    ButtonModule,
    InputTextModule,
    FormsModule,
    DialogModule,
    InputTextareaModule,
    DropdownModule,
    TagModule,
  ],
  templateUrl: './historial-clinico.component.html'
})
export class HistorialClinicoComponent implements OnInit{
  
  util: Util = new Util();
  list!: HistorialClinico[];
  ide = 0; 
  items = [
    { name: true, code: 'Si' },
    { name: false, code: 'No' }
  ];
  constructor(private serv: HistorialService, private router: Router) {}

  ngOnInit() {
    this.ide = this.util.getIdPersonSession();
    this.envConsultForId(Number(this.ide));
  }
 
  envConsultForId(id: number): void {
    try {
      this.serv.envConsultTransactionId(id).subscribe({next: (resp) => {
        this.list = resp;
      }});
    } catch (error) {console.log(error);}    
  }

  exportarPdf() {
    const columnas = ['tratamientoMedico', 'propensoHemorragia', 'alergiaMedica', 'hipertenso', 'diabetico'];
    const headers = ['Tratamiento Médico', 'Propenso a Hemorragia','Alergias', 'Es Hipertenso', 'Tiene Diabetes'];     
    const dataTransformada = this.list.map(model => ({
      tratamientoMedico: model.tratamientoMedico ? 'Sí' : 'No',
      propensoHemorragia: model.propensoHemorragia ? 'Sí' : 'No',
      hipertenso: model.hipertenso ? 'Sí' : 'No',
      diabetico: model.diabetico ? 'Sí' : 'No',
      alergiaMedica: model.alergiaMedica
     }));
    this.util.exportarPDF(dataTransformada, columnas, headers, 'Reporte_Historial_Clinico');
  }
  
}