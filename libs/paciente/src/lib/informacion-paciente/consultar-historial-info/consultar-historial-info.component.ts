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
  selector: 'app-consultar-historial-info',
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
  templateUrl: './consultar-historial-info.component.html'
})
export class ConsultarHistorialInfoComponent {
  
  util: Util = new Util();
  list!: HistorialClinico[];
  model: HistorialClinico = new HistorialClinico(); 
  //@Input() id = 0;
  @Output() registroExitoso = new EventEmitter<void>();
   
  items = [
    { name: true, code: 'Si' },
    { name: false, code: 'No' }
  ];
  constructor(private serv: HistorialService, private router: Router) {}
 
  private _id = 0;

  @Input()
  set id(value: number) {
    this._id = value;
    this.envConsultForId(this._id);
  }

  get id(): number {
    return this._id;
  }

 

  envConsultForId(id: number): void {
    try {
      this.serv.envConsultTransactionId(id).subscribe({next: (resp) => {
        this.list = resp;
      }});
    } catch (error) {console.log(error);}    
  }

  btnEnvInactiveRequest(id: number){
    const modelo = this.list?.find(item => item.id_historial === id);
    if (modelo) {
      modelo.estado = 'I';
      this.serv.envActualizarTransaction(modelo).subscribe((res) =>{
      this.registroExitoso.emit();
      this.util.validResponse(res);
      if (res.status == StatusCode.SUCCESS) {
        setTimeout(() => {
          this.router.navigateByUrl('/informacion-paciente');
        }, 3000);          
      }        
      },(err) => {
        this.util.NotificationError('Lo sentimos. : ' + err);
      });  
    }      
  }
}