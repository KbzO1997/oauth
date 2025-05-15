
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
}