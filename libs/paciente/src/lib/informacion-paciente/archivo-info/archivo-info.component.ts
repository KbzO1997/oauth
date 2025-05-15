import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { ArchivoPaciente, Cita, HistorialClinico, Paciente, StatusCode, Util } from '@oauth/shared-config';
import { Router } from '@angular/router';
import { TagModule } from 'primeng/tag';

import { FormsModule, NgForm } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { HistorialService } from '../historial.service';
import { FileUploadEvent, FileUploadModule } from 'primeng/fileupload';
import { BadgeModule } from 'primeng/badge';
import {  ProgressBarModule } from 'primeng/progressbar';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ArchivoService } from '../archivo.service';

interface UploadEvent {
  originalEvent: Event;
  files: File[];
}
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
    FileUploadModule,
    BadgeModule, ProgressBarModule, ToastModule,
  ],
  templateUrl: './archivo-info.component.html',
  providers: [MessageService]
})
export class ArchivoInfoComponent {
  
  util: Util = new Util();
  list!: HistorialClinico[];
  model: ArchivoPaciente = new ArchivoPaciente(); 

  @Input() id!: number;
  
  uploadedFiles: any[] = [];
  @ViewChild('fileUploader') fileUploader!: any;

  constructor(private serv: ArchivoService, private router: Router, private messageService: MessageService) {
  }
 
  onUpload(event: any) { 
    for (const file of event.files) {
      this.uploadedFiles.push(file);
      this.uploadToBackend(file);
    }
  
    this.messageService.add({ severity: 'info', summary: 'File Uploaded', detail: '' });
  }
  
  uploadToBackend(file: File) {
    const formData = new FormData();
    formData.append('file', file);
    this.serv.envRegistarTransaction(this.id, formData).subscribe((res) => {
      this.util.validResponse(res);
      
    },(err) => {
      this.util.NotificationError(err.error?.message);
    }); 
  }

  cleanArchive() {
    this.uploadedFiles = [];
    if (this.fileUploader) {
      this.fileUploader.clear(); 
    }
  }

}