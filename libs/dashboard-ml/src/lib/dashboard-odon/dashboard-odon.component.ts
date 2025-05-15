

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { Util } from '@oauth/shared-config';
import { CardModule } from 'primeng/card';
import { ChartModule } from 'primeng/chart';
import { TableModule } from 'primeng/table';
import { CalendarModule } from 'primeng/calendar';
import { ToolbarModule } from 'primeng/toolbar';
import { PanelModule } from 'primeng/panel';


@Component({
  selector: 'app-dashboard-odon',
  standalone: true,
  imports: [CommonModule, CardModule,
    ButtonModule,
    ChartModule,
    TableModule,
    CalendarModule,
    ToolbarModule,
    PanelModule,],
  templateUrl: './dashboard-odon.component.html'
})
export class DashboardOdonComponent {
  // Datos para los KPIs
  pacientesActivos = 150;
  citasProgramadas = 40;
  ingresosTotales = 20000;

  // Datos de Gráficos
  citasPorEspecialidad = {
    labels: ['Endodoncia', 'Ortodoncia', 'Implantes'],
    datasets: [
      {
        data: [15, 10, 15],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
      }
    ]
  };

  ingresosMensuales = {
    labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo'],
    datasets: [
      {
        label: 'Ingresos',
        data: [1000, 2000, 1500, 3000, 2500],
        fill: false,
        borderColor: '#42A5F5',
        tension: 0.1
      }
    ]
  };

  // Datos para la tabla de citas
  citas = [
    { paciente: 'Juan Pérez', fecha: new Date(), doctor: 'Dr. Soto', especialidad: 'Endodoncia' },
    { paciente: 'María López', fecha: new Date(), doctor: 'Dr. Díaz', especialidad: 'Ortodoncia' },
    { paciente: 'Carlos García', fecha: new Date(), doctor: 'Dr. Soto', especialidad: 'Implantes' },
    { paciente: 'Ana Martín', fecha: new Date(), doctor: 'Dr. Díaz', especialidad: 'Endodoncia' },
    { paciente: 'Luis González', fecha: new Date(), doctor: 'Dr. Soto', especialidad: 'Implantes' }
  ];

}

