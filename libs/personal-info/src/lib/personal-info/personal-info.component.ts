import { StatusCode, Usuario, Util } from '@oauth/shared-config';
import { Component, LOCALE_ID, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CommonModule, DatePipe } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { PersonalService } from './personal.service';
import { DropdownModule } from "primeng/dropdown";
import { ActivatedRoute, Router } from '@angular/router';
import { RegisterDialogComponent } from './register-dialog/register-dialog.component';


registerLocaleData(localeEs);

@Component({
  selector: 'app-personal-info',
  standalone: true,
  imports: [CardModule, ButtonModule, CommonModule, InputTextModule, FormsModule,DropdownModule,InputTextareaModule,
    RegisterDialogComponent
  ],
  templateUrl: './personal-info.component.html',
  providers: [{ provide: LOCALE_ID, useValue: 'es' }, DatePipe]
})
export class PersonalInfoComponent implements OnInit {
  currentDate: string;
  currentMonth: string;
  
  util: Util = new Util();
  usuario: Usuario = new Usuario();  
  
  itemsPaises = [
    { name: 'Ecuador', code: 'Ecuador' },
    { name: 'Argentina', code: 'Argentina' },
    { name: 'Brasil', code: 'Brasil' },
    { name: 'Chile', code: 'Chile' },
    { name: 'Colombia', code: 'Colombia' },
    { name: 'Peru', code: 'Peru' }
  ];

  ngOnInit() {
    //this.envConsultaForIdUserExteral();
    this.envConsultaForIdUserInternal();
  }

  constructor(private datePipe: DatePipe, private serv: PersonalService, private router: Router, private route: ActivatedRoute,) {
    this.currentDate = this.util.getFormattedDate(datePipe);
    this.currentMonth = this.util.getCurrentMonth(datePipe);
  }

  envConsultaForIdUserExteral(): void {    
    if (this.util.validateIdUser(this.router) > 0){
      this.serv.envConsultTransactionUserId(this.util.validateIdUser(this.router)).subscribe({next: (resp) => {
        this.usuario = resp;
      }});
    }    
  }

  envConsultaForIdUserInternal(): void {    
    const id = this.route.snapshot.paramMap.get('id');
      this.serv.envConsultTransactionUserId(Number(id)).subscribe({next: (resp) => {
        this.usuario = resp;
      }});
      
  }

  btnEnvRequest(): void { 
    this.serv.envActualizarTransaction(this.usuario).subscribe((res) => {
      if(res.status == StatusCode.SUCCESS) {
        this.util.validResponse(res) 
      } else {
        this.util.NotificationError(res.message);
      } 
    },() => {
      this.util.NotificationError('err');
    });    
  }
}
