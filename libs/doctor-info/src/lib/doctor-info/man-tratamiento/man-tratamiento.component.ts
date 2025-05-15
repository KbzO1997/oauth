import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { FormBuilder, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import {
  Doctor,
  Especialidad,
  StatusCode,
  Tratamiento,
  Util,
  ValidatorForm,
} from '@oauth/shared-config';
import { BadgeModule } from 'primeng/badge';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { DoctorService } from '../doctor.service';
import { TratamientoService } from '../tratamiento.service';
import { TableModule } from 'primeng/table';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

@Component({
  selector: 'app-man-tratamiento',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    InputTextModule,
    FormsModule,
    ReactiveFormsModule,
    DialogModule,
    InputTextareaModule,
    DropdownModule,
    BadgeModule,
    ToastModule,
    TableModule,
    NgxMaskDirective
  ],
  templateUrl: './man-tratamiento.component.html',
  providers: [MessageService, provideNgxMask()]
})
export class ManTratatientoDialogComponent implements OnInit {
  util: Util = new Util();
  tratamientoForm: FormGroup;
  list: Tratamiento[] = [];
  editando = false;
  idActual: number | null = null;
  dialogVisible = false;

  constructor(
    private fb: FormBuilder,
    private serv: TratamientoService
  ) {
    this.tratamientoForm = this.fb.group({
      nombre: ['', Validators.required],
      costo: [0, [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit() {
    this.cargarTratamientos();
  }

  cargarTratamientos() {
    this.serv.envConsultTransaction().subscribe(data => this.list = data);
    
  }

  btnOpenModal() {
    this.tratamientoForm.reset();
    this.dialogVisible = true;
    this.editando = false;
  }

  btnCloseModal() {
    this.dialogVisible = false;
    this.editando = false;
    this.idActual = null;
    this.tratamientoForm.reset();
  }

  btnEnvRequest() {
    if (this.tratamientoForm.invalid) return;

    const data = this.tratamientoForm.value;
    const costoString = this.tratamientoForm.get('costo')?.value;
    const costoNumber = parseFloat(costoString) / 100;
    data.costo = costoNumber;

    if (this.editando && this.idActual !== null) {
      data.idTratamiento = this.idActual;
      this.serv.envActualizarTransaction(data).subscribe(() => {
        this.cancelar();
        this.cargarTratamientos();
      });
    } else {
      this.serv.envRegistarTransaction(data).subscribe(() => {
        this.tratamientoForm.reset();
        this.cargarTratamientos();
      });
    }
    this.dialogVisible = false;
  }

  btnEnvEditRequest(tratamiento: Tratamiento) {
    this.editando = true;
    this.idActual = tratamiento.idTratamiento!;
    this.tratamientoForm.setValue({
      nombre: tratamiento.nombre,
      costo: tratamiento.costo
    });
    this.dialogVisible = true;
  }

  btnEnvInactiveRequest(id: number) {
    const modelo = this.list.find(item => item.idTratamiento === id);
    if (modelo) {
      modelo.estado = 'I';
      this.serv.envActualizarTransaction(modelo).subscribe((res) =>{
        this.util.validResponse(res);
        this.cargarTratamientos();
      });
    }    
  }

  cancelar() {
    this.editando = false;
    this.idActual = null;
    this.tratamientoForm.reset();
  }
}