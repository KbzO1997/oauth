import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { PacienteService } from '../paciente.service';
import { Paciente, StatusCode, Util } from '@oauth/shared-config';
import { FormControl, FormGroup, FormsModule, NgForm, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { StepsModule } from 'primeng/steps';
import { MenuItem } from 'primeng/api';


@Component({
  selector: 'app-registrar-paciente',
  standalone: true,
  imports: [CommonModule,
    StepsModule,
    ButtonModule,
    InputTextModule,
    FormsModule,
    InputTextareaModule,
    DropdownModule
    ],
  templateUrl: './registrar-paciente.component.html'
})
export class RegistrarPacienteComponent implements OnInit{
  items: MenuItem[] = [];
  activeStepIndex = 0;
  
  util: Util = new Util();
  list!: Paciente[];  
  model: Paciente = new Paciente(); 
  formulario!: NgForm;

  constructor(private serv: PacienteService, private route: ActivatedRoute, private router: Router) { 
   
   }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if(Number(id) > 0) {
      this.envConsultaForId(id);
    }
  }

  envConsultaForId(id: string | null): void {      
    this.serv.envConsultTransactionId(Number(id)).subscribe({next: (resp) => {
      this.model = resp;
    }});     
  }

  btnEnvRequest(): void {   
    this.serv.envRegistarTransaction(this.model).subscribe((res) => {
      this.util.validResponse(res);
      if(res.status == StatusCode.SUCCESS) {
        this.router.navigateByUrl('/informacion-paciente/informacion-paciente');
      }
    },(err) => {
      this.util.NotificationError(err.error?.message);
    });
  }
}
