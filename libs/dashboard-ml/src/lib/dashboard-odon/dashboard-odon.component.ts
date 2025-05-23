import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { Util } from '@oauth/shared-config';
import { CardModule } from 'primeng/card';
import { ChartModule } from 'primeng/chart';
import { TableModule } from 'primeng/table';
import { CalendarModule } from 'primeng/calendar';
import { ToolbarModule } from 'primeng/toolbar';
import { PanelModule } from 'primeng/panel';
import { MenuItem } from 'primeng/api';
import { debounceTime, Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';

import { MenuModule } from 'primeng/menu';
import { StyleClassModule } from 'primeng/styleclass';
import { PanelMenuModule } from 'primeng/panelmenu';

@Component({
  selector: 'app-dashboard-odon',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    ButtonModule,
    ChartModule,
    TableModule,
    CalendarModule,
    ToolbarModule,
    PanelModule,

    FormsModule,
    ChartModule,
    MenuModule,
    TableModule,
    StyleClassModule,
    PanelMenuModule,
    ButtonModule,
  ],
  templateUrl: './dashboard-odon.component.html',
})
export class DashboardOdonComponent implements OnInit, OnDestroy {
  items!: MenuItem[];

  products!: any[];
  isNotification = true;

  treatmentChartData: any;
  patientsChartData: any;
  appointmentsChartData: any;
  oralHealthChartData: any;

  chartOptions: any;

  subscription!: Subscription;

  constructor() {
    this.initChart();
    this.secondChart();
    this.threeChart();
    this.fourChart();
  }

  ngOnInit() {
    this.initChart();

    this.products = [
      {
        idCita: 8,
        paciente: {
          idPaciente: 3,
          numeroHistoriaClinica: 102305,
          persona: {
            id: 64,
            nombres: 'hijuij',
            primerApellido: 'iujiu',
            segundoApellido: 'jiuj',
            cedula: '66556',
            telefono: '454',
            email: '65456',
            direccion: '5465',
            contacto: '4564',
            pais: '',
          },
        },
        doctor: {
          idDoctor: 2,
          numeroColegiado: '3424',
          especialidad: {
            idEspecialidad: 2,
            nombreEspecialidad: 'Ortodoncia',
            descripcion:
              'Corrección de dientes y mandíbulas mal posicionadas mediante aparatos.',
          },
          persona: {
            id: 59,
            nombres: 'ijnjnk',
            primerApellido: 'jnkj',
            segundoApellido: 'nj',
            cedula: '5489489498',
            telefono: '7687687',
            email: '67868h',
            direccion: 'hjbjh',
            contacto: 'hjb',
            pais: '',
          },
        },
        tratamiento: {
          idTratamiento: 4,
          nombre: 'Extracción Quirúrgica',
          costo: 80,
          estado: 'A',
        },
        fecha: '2025-04-15',
        hora: '16:58:00',
        motivoCita: 'ewrrsdvfwf',
        estado: 'Asignado',
        costo: 80,
        valor_pago: 0,
      },
    ];

    this.items = [
      { label: 'Add New', icon: 'pi pi-fw pi-plus' },
      { label: 'Remove', icon: 'pi pi-fw pi-minus' },
    ];
  }

  initChart() {
    this.treatmentChartData = {
      labels: ['Limpieza', 'Ortodoncia', 'Extracción', 'Endodoncia'],
      datasets: [
        {
          data: [45, 25, 15, 15],
          backgroundColor: ['#42A5F5', '#66BB6A', '#FFA726', '#EF5350'],
          hoverBackgroundColor: ['#64B5F6', '#81C784', '#FFB74D', '#E57373'],
        },
      ],
    };

    this.chartOptions = {
      plugins: {
        legend: {
          position: 'bottom',
        },
        tooltip: {
          callbacks: {
            label: (tooltipItem: any) => {
              return `${tooltipItem.label}: ${tooltipItem.raw} tratamientos`;
            },
          },
        },
      },
      responsive: true,
      maintainAspectRatio: false,
    };
  }

  secondChart() {
    this.patientsChartData = {
      labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'],
      datasets: [
        {
          label: 'Pacientes Atendidos',
          data: [120, 150, 130, 170, 190, 160],
          fill: false,
          borderColor: '#42A5F5',
          tension: 0.4,
        },
      ],
    };

    this.chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top',
        },
        tooltip: {
          callbacks: {
            label: (tooltipItem: any) => ` ${tooltipItem.raw} pacientes`,
          },
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Pacientes',
          },
        },
        x: {
          title: {
            display: true,
            text: 'Meses',
          },
        },
      },
    };
  }

  threeChart() {
    this.appointmentsChartData = {
      labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'],
      datasets: [
        {
          label: 'Citas Programadas',
          data: [100, 120, 110, 130, 140, 150],
          backgroundColor: '#42A5F5',
        },
        {
          label: 'Citas Asistidas',
          data: [90, 110, 95, 125, 130, 140],
          backgroundColor: '#66BB6A',
        },
      ],
    };

    this.chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top',
        },
        tooltip: {
          callbacks: {
            label: (tooltipItem: any) =>
              `${tooltipItem.dataset.label}: ${tooltipItem.raw}`,
          },
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Cantidad de Citas',
          },
        },
        x: {
          title: {
            display: true,
            text: 'Meses',
          },
        },
      },
    };
  }

  fourChart() {
    this.oralHealthChartData = {
      labels: [
        'Caries',
        'Gingivitis',
        'Periodontitis',
        'Halitosis',
        'Bruxismo',
      ],
      datasets: [
        {
          label: 'Índice de casos detectados',
          data: [75, 50, 30, 40, 20],
          backgroundColor: 'rgba(66, 165, 245, 0.2)',
          borderColor: '#42A5F5',
          pointBackgroundColor: '#1E88E5',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: '#1E88E5',
        },
      ],
    };

    this.chartOptions = {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        tooltip: {
          callbacks: {
            label: (tooltipItem: any) => ` Casos: ${tooltipItem.raw}`,
          },
        },
      },
      scales: {
        r: {
          beginAtZero: true,
          max: 100,
          ticks: {
            stepSize: 20,
          },
          pointLabels: {
            font: {
              size: 14,
            },
          },
        },
      },
    };
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
