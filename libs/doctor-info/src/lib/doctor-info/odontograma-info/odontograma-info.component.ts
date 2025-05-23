
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';

import { InputTextModule } from 'primeng/inputtext';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogModule } from 'primeng/dialog';

import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { PanelModule } from 'primeng/panel';
import { CheckboxModule } from 'primeng/checkbox';
import { InputNumberModule } from 'primeng/inputnumber';
import { RadioButtonModule } from 'primeng/radiobutton';
import { OdontogramaService } from '../odontograma.service';
import { Odontograma, StatusCode, Tooth, Util } from '@oauth/shared-config';
import { DATOS_INDICE_CPO, DATOS_PIEZAS, ENFERMEDAD_PERIODONTAL, OPTIONS_0_1, OPTIONS_0_3, STATUS_OPTIONS, TOOTH_TYPES } from './odontograma-const';
import { CardModule } from 'primeng/card';
import { AccordionModule } from 'primeng/accordion';

/*
interface Tooth {
  id: number;
  type: string;
  position: string;
  quadrant: number;
  status: string;
}*/
@Component({
  selector: 'app-odontograma-info',
  standalone: true,
  imports: [CommonModule, 
    TableModule, 
    ButtonModule,
    InputTextModule, 
    DialogModule,
    DropdownModule,
    FormsModule,
    PanelModule,
    CheckboxModule,
    InputNumberModule,
    RadioButtonModule,
    CardModule,
    AccordionModule
  ],
  templateUrl: './odontograma-info.component.html',
  styleUrl: './odontograma-info.component.css'
})
export class OdontogramaInfoComponent  implements OnInit {

  upperTeeth: Tooth[] = [];
  lowerTeeth: Tooth[] = [];
  model: Odontograma = new Odontograma();
  util: Util = new Util();
  listTooth: Tooth[] = [];
  
  //Ref. TODO Constante
  toothTypes = TOOTH_TYPES;
  placaOptions = OPTIONS_0_3;
  calculoOptions = OPTIONS_0_3;
  datosPiezas = DATOS_PIEZAS;
  statusOptions = STATUS_OPTIONS;
  datosIndiceCPO = DATOS_INDICE_CPO;
  gingivitisOptions = OPTIONS_0_1;
  enfermedadPeriodontal = ENFERMEDAD_PERIODONTAL;

  selectedTooth: Tooth | null = null;
  displayToothDetails     = false;
  itemEnfermedad  = '';
  itemOclusion    = '';
  itemFluorosis   = '';
  errorText = 'Debes ingresar un número de pieza válido (1-32) antes de agregar una nueva fila.';
  
  constructor(private serv: OdontogramaService, private router: Router, private route: ActivatedRoute,) {  }

  ngOnInit() {
    this.initializeTeeth();
    const id = this.route.snapshot.paramMap.get('id');
    this.model.id_cita = Number(id);
  }

  initializeTeeth() {
    for (let i = 0; i < 16; i++) { // Inicializar dientes superiores (de derecha a izquierda)
      this.upperTeeth.push({
        id_tooth: i + 1,
        tipo: this.toothTypes[i],
        position: 'upper',
        quadrant: i < 8 ? 1 : 2,
        estado: 'healthy'
      });
    }    
    
    for (let i = 0; i < 16; i++) { // Inicializar dientes inferiores (de derecha a izquierda)
      this.lowerTeeth.push({
        id_tooth: i + 17,
        tipo: this.toothTypes[i],
        position: 'lower',
        quadrant: i < 8 ? 3 : 4,
        estado: 'healthy'
      });
    }
  }    
    
  selectTooth(tooth: Tooth) {
    this.selectedTooth = tooth;
    this.displayToothDetails = true;
  }

  getToothClass(tooth: Tooth) {
    return {
      'tooth': true,
      [tooth.tipo]: true,
      [tooth.estado]: true
    };
  }

  updateToothStatus() {
    this.displayToothDetails = false;
    if (this.selectedTooth !== null) {
      this.listTooth.push(this.selectedTooth);
    }
    console.log(this.listTooth);
  }

  btnAddRow() {
    const ultimaPieza = this.datosPiezas[this.datosPiezas.length - 1];
    if (ultimaPieza && (ultimaPieza.pieza === 0 || ultimaPieza.pieza === null || ultimaPieza.pieza.toString() === '')) {
      this.util.NotificationError(this.errorText);
    }else {
      this.datosPiezas.push({ pieza: 0, placa: 0, calculo: 0, gingivitis: 0 });
    }    
  }

  validatePiece(rowData: any) {
    const value = rowData.pieza;
    if (value && (isNaN(value) || value < 1 || value > 32)) {
      rowData.pieza = ''; 
    }
  }

  btnEnvRequest(): void {
    console.log(this.model);
    this.model.periodontalDisease.enfermedad = this.itemEnfermedad;
    this.model.periodontalDisease.oclusion = this.itemOclusion;
    this.model.periodontalDisease.fluorosis = this.itemFluorosis;
    this.model.toothPiece = this.datosPiezas;
    this.model.tooth = this.listTooth;

    this.serv.envRegistarTransaction(this.model).subscribe(
      (res) => {
        this.util.validResponse(res);
        if (res.status == StatusCode.SUCCESS) {
          this.util.validResponse(res);
        }
      },
      (err) => {
        this.util.NotificationError(err.error?.message);
      }
    );
  }
}