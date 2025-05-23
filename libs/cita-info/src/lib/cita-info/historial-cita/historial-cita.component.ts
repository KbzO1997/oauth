
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { Cita, Util } from '@oauth/shared-config';
import { Router } from '@angular/router';
import { DialogModule } from 'primeng/dialog';
import { CitaService } from '../cita.service';

@Component({
  selector: 'app-historial-cita',
  standalone: true,
  imports: [CommonModule, 
    TableModule, 
    ButtonModule,
    InputTextModule,
    DialogModule
  ],
  templateUrl: './historial-cita.component.html'
})
export class HistorialCitaComponent implements OnInit{
  
  util: Util = new Util();
  list!: Cita[];
  
  constructor(private serv: CitaService, private router: Router) {  }

  ngOnInit() {
    this.envConsultAll();
  }

  envConsultAll(): void {
    try {
      this.serv.envConsultTransaction().subscribe({next: (resp) => {
        this.list = resp;
      }});
    } catch (error) {console.log(error);}    
  }

  exportarPdf() {
    const columnas = ['tratamiento.nombre', 'doctor.persona.nombres', 'doctor.persona.primerApellido', 'doctor.persona.segundoApellido', 'paciente.persona.nombres', 'paciente.persona.primerApellido', 'paciente.persona.segundoApellido', 'fecha', 'hora', 'motivoCita', 'estado', 'valor_pago']; 
    const headers = ['Tratamiento', 'Doctor', 'Apellido Paterno', 'Apellido Materno', 'Paciente', 'Apellido Paterno', 'Apellido Materno','Fecha', 'Hora', 'Motivo', 'Estado', 'Costo'];    
    this.util.exportarPDF(this.list, columnas, headers, 'Reporte_Historial_Citas');
  }

}