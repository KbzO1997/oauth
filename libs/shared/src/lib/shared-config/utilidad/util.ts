import Swal from 'sweetalert2';

import { Table } from 'primeng/table';
import { RsTrxService } from './response';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { StatusCode } from './enum';

export class Util {
  errorText =
    'Ha ocurrido un error inesperado. Por favor, intenta nuevamente más tarde.';

  NotificationSuccess(text: string) {
    Swal.fire({
      title: 'Transacción realizada con éxito.',
      text: text,
      icon: 'success',
      confirmButtonText: 'Aceptar',
    });
  }

  NotificationError(text: string) {
    const description = text == 'err' ? this.errorText : text;
    Swal.fire({
      title: 'Lo sentimos!',
      text: description,
      icon: 'error',
      confirmButtonText: 'Aceptar',
    });
  }

  NotificationErrorRedirect(text: string, router: Router) {
    const description = text === 'err' ? this.errorText : text;

    Swal.fire({
      title: 'Lo sentimos!',
      text: description,
      icon: 'error',
      confirmButtonText: 'Aceptar',
    }).then((result) => {
      if (result.isConfirmed) {
        router.navigate(['/']);
      }
    });
  }

  validResponse(resp: RsTrxService): void {
    if(resp.status == StatusCode.SUCCESS) {
      this.NotificationSuccess('Registrado exitosamente.');
    } else {
      this.NotificationError(resp.message);
    }  }

  printRequest(objeto: any): void {
    console.log('*************REQUEST*****************');
    console.log(objeto);
    console.log('******************************');
  }

  printResponse(objeto: any): void {
    console.log('*************RESPONSE*****************');
    console.log(objeto);
    console.log('******************************');
  }

  obtIdUser(): number {
    const userId = sessionStorage.getItem('usuariocli_id')
      ? Number(sessionStorage.getItem('usuariocli_id'))
      : 0;
    return userId;
  }

  textNumber(event: KeyboardEvent) {
    const pattern = /^[0-9]*$/;
    const inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  textStringNotScape(event: KeyboardEvent) {
    const pattern = /^[a-zA-Z]*$/;
    const inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  textStringNumber(event: KeyboardEvent) {
    const pattern = /^[a-zA-Z0-9\s]*$/;
    const inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  textStringScape(event: KeyboardEvent) {
    const pattern = /^[a-zA-Z ]*$/;
    const inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  textNotSpace(event: KeyboardEvent) {
    if (event.key === ' ') {
      event.preventDefault();
    }
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  getNameSessionUser(): string {
    return sessionStorage.getItem('nombre')! || 'Admin';
  }

  getIdSessionUser(): number | 0 {
    const id = sessionStorage.getItem('id');
    return id ? Number(id) : 0;
  }

  getRolSessionUser(): string {
    return sessionStorage.getItem('rol')!;
  }

  getIdPersonSession(): number | 0 {
    const id = sessionStorage.getItem('ide');
    return id ? Number(id) : 0;
  }
  
  getFormattedDate(datePipe: DatePipe): string {
    const now = new Date();
    return datePipe.transform(now, "EEEE, d 'de' MMMM 'del' y HH:mm")!;
  }
  getCurrentMonth(datePipe: DatePipe): string {
    const now = new Date();
    return datePipe.transform(now, 'MMMM')!;
  }

  validateIdUser(router: Router): number {
    const idUser = this.getIdSessionUser();
    if (idUser == 0) {
      this.NotificationErrorRedirect(
        'No has iniciado sesión. Por favor, inicia sesión antes de intentar registrar.',
        router
      );
      return 0;
    } else {
      return idUser;
    }
  }

  routerPath(): string {
    return '/ml/';
  }

  sessionStorage(displayName: string, photoURL: string, email: string) {
    sessionStorage.setItem('nombre', displayName);
    sessionStorage.setItem('photo', photoURL);
    sessionStorage.setItem('email', email);
  }

  deleteStorage() {
    sessionStorage.removeItem('nombre');
    sessionStorage.removeItem('photo');
    sessionStorage.removeItem('email');
    sessionStorage.removeItem('id');
  }
}
