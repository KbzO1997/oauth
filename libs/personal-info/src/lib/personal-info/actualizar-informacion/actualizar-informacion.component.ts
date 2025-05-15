import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { RqUsuario, StatusCode, Usuario, Util } from '@oauth/shared-config';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { DialogModule } from 'primeng/dialog';
import { PersonalService } from '../personal.service';
import { MessageService } from 'primeng/api';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-actualizar-informacion',
  standalone: true,
  imports: [CommonModule,
      ButtonModule,
      InputTextModule,
      FormsModule,
      DialogModule,
      InputTextareaModule,
      DropdownModule,
      RouterModule],
  templateUrl: './actualizar-informacion.component.html',
  providers: [MessageService]
})
export class ActualizarInformacionComponent   implements OnInit{
  util: Util = new Util();
  listUsuario!: Usuario[];  
  usuario: Usuario = new Usuario();  
  
  itemsRoles = [
    { name: 'Admin', code: 'Admin' },
    { name: 'PACIENTE', code: 'Paciente' }, 
    { name: 'DOCTOR', code: 'Doctor' }
  ];


  constructor(private serv: PersonalService, private route: ActivatedRoute, private router: Router) {  }

  ngOnInit() {
    this.envConsultaForIdUserInternal();
  }

  envConsultaForIdUserInternal(): void {    
    const id = this.route.snapshot.paramMap.get('id');
    this.serv.envConsultTransactionUserId(Number(id)).subscribe({next: (resp) => {
      this.usuario = resp;
      this.usuario.contrasenia = this.usuario.persona.pais; 
      console.log(resp);
    }});     
  }

  btnEnvRequest(): void {
    this.usuario = this.mapUser(this.usuario);
    console.log(this.usuario);   
    this.serv.envActualizarTransaction(this.usuario).subscribe((res) => {
      this.util.validResponse(res);
      if(res.status == StatusCode.SUCCESS) {
        this.router.navigateByUrl('/personal-info/consultar-personas');
      }
    },(err) => {
      this.util.NotificationError(err.error?.message);
    });
  }

  mapUser(source: Usuario): Usuario {  
    const user: Usuario = {
      id: source.id,
      username: source.username,
      contrasenia: source.contrasenia,
      rol: source.rol,
      estado: source.estado,
      persona: source.persona
    };
    return user;
  }


}