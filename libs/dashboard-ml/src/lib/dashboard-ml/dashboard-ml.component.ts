import { CsvService } from './csvService';
import { ChartModule } from 'primeng/chart';
import { ChartOptions, ChartData } from 'chart.js';
import localeEs from '@angular/common/locales/es';
import { Component, LOCALE_ID, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { Util } from '@oauth/shared-config';

interface CsvRow {
  [key: string]: string | number;
}

@Component({
  selector: 'app-dashboard-ml',
  standalone: true,
  imports: [CommonModule, ChartModule, ButtonModule],
  templateUrl: './dashboard-ml.component.html',
  providers: [{ provide: LOCALE_ID, useValue: 'es' }, DatePipe]
})
export class DashboardMlComponent implements OnInit {
  clusters: any[] = [];
  barChartData: any;

  currentDate: string;
  currentMonth: string;
  nameUser: string = "";
  util: Util = new Util();

  /*barChartOptions = {
    responsive: true,
    scales: {
      x: {
        beginAtZero: true
      },
      y: {
        beginAtZero: true
      }
    }
  };*/
  constructor(private csvService: CsvService, private datePipe: DatePipe) {
    this.currentDate = this.util.getFormattedDate(datePipe);
    this.currentMonth = this.util.getCurrentMonth(datePipe);
  }

  ngOnInit() {

    this.nameUser = this.util.getNameSessionUser();
    
    this.loadSummary_Aglomerative();
    /*this.loadSummary_Dbscan();
    this.loadSummary_Spectral();
    this.loadSummary_Kmeans();*/
    this.loadSummary_Rfm();
    
  }

  loadSummary_Aglomerative() {
    this.csvService.csvSummary_Aglomerative().subscribe((data) => {
      this.clusters = this.parseCSV(data);
      console.log('Clusters loadSummary_Aglomerative:', this.clusters);
      //this.prepareChartData();
      
    });
  }

  loadSummary_Dbscan() {
    this.csvService.csvSummary_Dbscan().subscribe((data) => {
      this.clusters = this.parseCSV(data);
      console.log('Clusters loadSummary_Dbscan:', this.clusters);
      //this.prepareChartData();
    });
  }

  loadSummary_Spectral() {
    this.csvService.csvSummary_Spectral().subscribe((data) => {
      this.clusters = this.parseCSV(data);
      console.log('Clusters loadSummary_Spectral:', this.clusters);
      //this.prepareChartData();
    });
  }

  loadSummary_Kmeans() {
    this.csvService.csvSummary_Kmeans().subscribe((data) => {
      this.clusters = this.parseCSV(data);
      console.log('Clusters loadSummary_Kmeans:', this.clusters);
      //this.prepareChartData();
    });
  }

  loadSummary_Rfm() {
    this.csvService.csvRfm().subscribe((data) => {
      this.clusters = this.parseCSV(data);
      console.log('Clusters RFM:', this.clusters);
      this.prepareChartLineData();
    });
  }
  

  parseCSV(csvText: string): CsvRow[] {
    const lines = csvText.split('\n').filter((line) => line.trim() !== '');
    const headers = lines[0].split(',').map((h) => h.trim());
    return lines.slice(1).map((line) => {
      const values = line.split(',').map((v) => v.trim());
      return headers.reduce<CsvRow>((obj, header, index) => {
        obj[header] = isNaN(+values[index]) ? values[index] : +values[index];
        return obj;
      }, {} as CsvRow);
    });
  }


  downloadImage(imageName: string): void {
    const link = document.createElement('a');
    link.href = this.util.routerPath() + imageName;
    link.download = imageName;
    link.click();
  }

  prepareChartData() {
    this.barChartData = {
      labels: this.clusters.map(cluster => `Cluster ${cluster['Cluster']}`),
      datasets: [
        {
          label: 'Duración Ciclo de Ventas (días)',
          data: this.clusters.map(cluster => cluster['Duración Ciclo de Ventas (días)']),
          backgroundColor: '#ec4899',
        },
        {
          label: 'Tiempo de Cierre (días)',
          data: this.clusters.map(cluster => cluster['Tiempo de Cierre (días)']),
          backgroundColor: '#42A5F5',
        },
        {
          label: 'Leads Generados',
          data: this.clusters.map(cluster => cluster['Leads Generados']),
          backgroundColor: '#66BB6A',
        },
        {
          label: 'Oportunidades Abiertas',
          data: this.clusters.map(cluster => cluster['Oportunidades Abiertas']),
          backgroundColor: '#FFA726',
        },
        {
          label: 'Contratos Cerrados',
          data: this.clusters.map(cluster => cluster['Contratos Cerrados']),
          backgroundColor: '#FF7043',
        }
      ]
    };    
  }


  salesData: any;
  chartOptions: any;

  prepareChartLineData(){
    const clusters = ['Cluster 1', 'Cluster 2'];
    
    this.salesData = {
      labels: clusters,
      datasets: [
        {
          label: 'Cantidad de Clientes',
          data: this.clusters.map(cluster => cluster['Cantidad de Clientes']),
          fill: false,
          borderColor: '#42A5F5',
          tension: 0.4
        },
        {
          label: 'Frecuencia Compras',
          data: this.clusters.map(cluster => cluster['Frecuencia Compras']),
          fill: false,
          borderColor: '#FFA726',
          tension: 0.4
        },
        {
          label: 'Recencia (días)',
          data: this.clusters.map(cluster => cluster['Recencia (días)']),
          fill: false,
          borderColor: '#66BB6A',
          tension: 0.4
        },
        {
          label: 'Valor del Contrato',
          data: this.clusters.map(cluster => cluster['Valor del Contrato']),
          fill: false,
          borderColor: '#ec4899',
          tension: 0.4
        }
      ]
    };

    this.chartOptions = {
      responsive: true,
      plugins: {
        legend: {
          position: 'top'
        },
        tooltip: {
          mode: 'index',
          intersect: false
        }
      },
      scales: {
        x: {
          title: {
            display: true,
            text: 'Seguimiento de tendencias'
          }
        },
        y: {
          title: {
            display: true,
            text: 'Valores'
          }
        }
      }
    };
  
  }

}

/*Segmentacion Lineal
El gráfico mostrará líneas para cada métrica distribuidas según los clusters, facilitando identificar:

Tendencias entre clusters.
La relación entre Cantidad de Clientes, Recencia (días), Frecuencia Compras, y Valor del Contrato.
*/