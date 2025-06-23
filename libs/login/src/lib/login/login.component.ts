import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AuthenticationRq,
  RqUsuario,
  RsTrxService,
  Util
} from '@oauth/shared-config';
import { Router, RouterModule } from '@angular/router';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { PasswordModule } from 'primeng/password';

import { LoginService } from './login.service';
import { PoliticaComponent } from './politica/politica.component';
import { LoginFacebookComponent } from './login-facebook/login-facebook.component';
import { LoginGoogleComponent } from './login-google/login-google.component';
import { StatusCode } from '@oauth/shared-config';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    InputTextModule,
    FormsModule,
    DialogModule,
    InputTextModule,
    DropdownModule,
    RouterModule,
    PasswordModule,
    PoliticaComponent,
    LoginFacebookComponent,
    LoginGoogleComponent,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
 
  model: AuthenticationRq = new AuthenticationRq();
  util: Util = new Util();
  showPassword = false;
  constructor(private serv: LoginService, private router: Router) {}

  loginWithDb() {
    
    if (this.model.username != 'admin') {     
      this.serv.envLoginTransaction(this.model).subscribe(
        (resp) => {
          this.validateResposeLogin(resp);
        },
        (err) => {
          this.util.NotificationError(err.error.message);
          this.model = new AuthenticationRq();
        }
      );
    } else {
      this.isUserMock();
    }
  }

  isUserMock(): void {
    this.serv.envTokenTransaction(this.model).subscribe((resp) => {
      sessionStorage.setItem('token', resp.jwt);
      sessionStorage.setItem('rol', 'admin');
      this.router.navigateByUrl('/personal-info');
    });
  }

  validateResposeLogin(resp: RsTrxService) {
    if (resp.status ==  StatusCode.SUCCESS) {
      sessionStorage.setItem('id', resp.code.toString());
      sessionStorage.setItem('nombre', resp.message);
      sessionStorage.setItem('token', resp.token);
      sessionStorage.setItem('rol', resp.datoAdicional);
      sessionStorage.setItem('ide', resp.ide.toString());
     
      this.setRouteForRole(resp.datoAdicional);
    } else {
      this.util.NotificationError(resp.message);
    }
  }

  setRouteForRole(role: string) {
    let route = '';  
    switch (role) {
      case 'ADMIN':
        route = '/personal-info/consultar-personas';
        break;
      case 'DOCTOR':
        route = '/cita-info/calendario-info';
        break;
      case 'PACIENTE':
        route = '/cita-info/historial-cita';
        break;
      default:
        route = '/'; 
        break;
    }  
    this.router.navigate([route]);
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

}