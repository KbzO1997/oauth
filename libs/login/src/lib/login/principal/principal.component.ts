import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { Util } from '@oauth/shared-config';
import { Router } from '@angular/router';
import { TagModule } from 'primeng/tag';

import { FormsModule, NgForm } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { BadgeModule } from 'primeng/badge';
import {  ProgressBarModule } from 'primeng/progressbar';
import { ToastModule } from 'primeng/toast';

import { CardModule } from 'primeng/card';
import { DialogRegistroComponent } from '../dialog-registro/dialog-registro.component';



@Component({
  selector: 'app-archivo-info',
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
    BadgeModule, ProgressBarModule, ToastModule,
CardModule,
DialogRegistroComponent
  ],
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.css',
})
export class PrincipalComponent {
  
  util: Util = new Util();
  dialog = false;
  @ViewChild('registerDialog') registerDialog!: DialogRegistroComponent;
  constructor(private router: Router) {
  }
 
 services = [
    {
      title: 'Odontología General',
      description: 'Limpieza dental, tratamientos de caries, extracciones y cuidado preventivo para mantener tu salud bucal.',
      icon: './o_general.jpg',
      color: '#3b82f6'
    },
    {
      title: 'Ortodoncia',
      description: 'Brackets tradicionales e invisibles para corregir la posición de tus dientes y mejorar tu sonrisa.',
      icon: './o_ortodoncia.jpg',
      color: '#10b981'
    },
    {
      title: 'Implantes Dentales',
      description: 'Reemplazo de dientes perdidos con implantes de titanio de alta calidad y coronas estéticas.',
      icon: './o_implantes.jpg',
      color: '#f59e0b'
    },
    {
      title: 'Blanqueamiento',
      description: 'Tratamientos profesionales para blanquear tus dientes y conseguir una sonrisa más brillante.',
      icon: './o_blanqueamiento.jpg',
      color: '#8b5cf6'
    },
    {
      title: 'Endodoncia',
      description: 'Tratamiento de conductos radiculares para salvar dientes dañados y eliminar el dolor.',
      icon: './o_endodoncia.png',
      color: '#ef4444'
    },
    {
      title: 'Odontopediatría',
      description: 'Atención dental especializada para niños en un ambiente cómodo y amigable.',
      icon: './o_odontopediatría.jpg',
      color: '#06b6d4'
    }
  ];

  

  onLogin(){
     this.router.navigateByUrl('/login');
  }

   btnOpenModal(){   
    this.dialog = true;
  }

  resetForm() {
    if (this.registerDialog) {
      this.registerDialog.resetForm();
    }
  }
}