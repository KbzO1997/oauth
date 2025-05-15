
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { Cita, Util } from '@oauth/shared-config';
import { Router } from '@angular/router';
import { DialogModule } from 'primeng/dialog';
import { TagModule } from 'primeng/tag';
import { CitaDialogComponent } from '../cita-dialog/cita-dialog.component';
import { CitaService } from '../cita.service';

@Component({
  selector: 'app-p-cita-info',
  standalone: true,
  imports: [CommonModule, 
    TableModule, 
    ButtonModule,
    InputTextModule,
    DialogModule,
    CitaDialogComponent,
    TagModule
  ],
  templateUrl: './p-cita-info.component.html'
})
export class PCitaInfoComponent implements OnInit{
  
  util: Util = new Util();
  list!: Cita[];
  model: Cita = new Cita();  
  dialog = false;
  ide = 0;
  
  constructor(private serv: CitaService, private router: Router) {  }

  ngOnInit() {
    this.ide = this.util.getIdPersonSession();
    this.envConsultAll();
  }

  envConsultAll(): void {
    try {
      this.serv.envConsultTransaction().subscribe({next: (resp) => {
        const filterPaciente = resp.filter(item => item.paciente?.persona.id === this.ide); 
        this.list = filterPaciente;
      }});
    } catch (error) {console.log(error);}    
  }

 

  btnOpenModal(){  
    this.dialog = true;
  }

  btnEnvEditRequest(id: number){
    const modelo = this.list?.find(item => item.id_cita === id);
    if (modelo) {
      modelo.estado = 'Cancelada';
      this.serv.envActualizarTransaction(modelo).subscribe((res) =>{
        this.util.validResponse(res);
      },(err) => {
        this.util.NotificationError('Lo sentimos. : ' + err);
      });  
    }      
  }

  btnRedirectVisualizar(id: number){ 
    this.router.navigate(["/doctor-info/visualizar-odontograma-info", id]);
  }
  
}