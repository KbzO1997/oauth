import { Component, ViewChild, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { FormsModule, NgForm } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import {

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
import {DoctorService} from '@oauth/doctor-info';
import {PacienteService} from '@oauth/informacion-paciente';
import { CitaService } from '../cita.service';

import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';


interface Cita {
  id?: string;
  title: string;
  start: Date;
  end?: Date;
  description?: string;
  // Puedes agregar más propiedades según tus necesidades
}

@Component({
  selector: 'app-calendario-info',
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
    FullCalendarModule
  ],
  templateUrl: './calendario-info.component.html'  
})

export class CalendarioInfoComponent {  
  calendarOptions: any;
  displayModal = false;
  citaSeleccionada: any = {};
  citas: any[] = [];

  constructor(private serv_c: CitaService) {
    this.calendarOptions = {
      initialView: 'dayGridMonth',
      plugins: [dayGridPlugin, interactionPlugin],
      selectable: true,
      eventClick: this.handleEventClick.bind(this),
      //dateClick: this.handleDateClick.bind(this),
      events: []
      /*events: [
        { title: 'Reunión', date: '2025-04-17' },
        { title: 'Consulta médica', date: '2025-04-20' }
      ]*/
    };
    this.envConsultAll();
  }

  envConsultAll() {
    this.serv_c.envConsultTransaction().subscribe(data => {
      this.citas = data;
      this.calendarOptions.events = data.map(cita => ({
        title: cita.tratamiento?.nombre, // o cualquier título relevante
        date: cita.fecha,
        extendedProps: {
          hora: cita.hora,
          doctor: cita.doctor,
          tratamiento: cita.tratamiento,
          motivoCita: cita.motivoCita,
          costo: cita.costo
        }
      }));
    });
  }

  handleEventClick(clickInfo: any) {
    const { start, extendedProps } = clickInfo.event;
    this.citaSeleccionada = {
      fecha: start,
      hora: extendedProps.hora,
      doctor: extendedProps.doctor,
      tratamiento: extendedProps.tratamiento,
      motivoCita: extendedProps.motivoCita,
      costo: extendedProps.costo
    };
    this.displayModal = true;
  }

  /*handleDateClick(arg: any) {
    const title = prompt('Ingrese el nombre de la cita en ' + arg.dateStr);
    if (title) {
      this.calendarOptions.events = [
        ...this.calendarOptions.events,
        { title, date: arg.dateStr }
      ];
    }
  }*/
}