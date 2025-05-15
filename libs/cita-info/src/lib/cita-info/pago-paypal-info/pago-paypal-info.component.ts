import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';

import { CardModule } from 'primeng/card';
import { HttpClient } from '@angular/common/http';
import { CitaService } from '../cita.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Cita, Pago, StatusCode, Util } from '@oauth/shared-config';
import { PagoService } from '../pago.service';

@Component({
  selector: 'app-pago-paypal-info',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    InputTextModule,
    FormsModule,
    DialogModule,
    InputTextareaModule,
    DropdownModule,
    CardModule,
  ],
  templateUrl: './pago-paypal-info.component.html',
})
export class PagoPaypalInfoComponent implements OnInit {
  util: Util = new Util();
  display = false;
  model: Cita = new Cita();
  pago: Pago = new Pago();

  constructor(
    private serv: CitaService,
    private serv_p: PagoService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.envConsultaForIdUserInternal();
  }

  envConsultaForIdUserInternal(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.serv.envConsultTransactionId(Number(id)).subscribe({
      next: (resp) => {
        this.model = resp;
      },
    });
  }

  btnEnvRequest(): void {
    this.mapperPago();
    this.serv_p.envRegistarTransaction(this.pago).subscribe(
      (res) => {
        this.util.validResponse(res);
        if (res.status == StatusCode.SUCCESS) {
          setTimeout(() => {
            this.router.navigateByUrl('/cita-info');
          }, 3000);
        }
      },
      (err) => {
        this.util.NotificationError(err.error?.message);
      }
    );
  }

  mapperPago(): void {
    this.pago.cita = this.model; //new Cita();
    this.pago.cita.idCita = this.model.idCita;
    this.pago.monto = this.model.costo;
    this.pago.estadoPago = 'Pagado';
    this.pago.cita.estado = 'Finalizada';
    this.pago.cita.valor_pago = this.model.costo;
  }
  /*pagar() {
      try {
        this.serv.envPayTransaction().subscribe({next: (data) => {
          if (data.redirect_url) {
            window.location.href = data.redirect_url; // redirige a PayPal
          }
        }});
      } catch (error) {console.log(error);}    
  }*/

  abrirModalPaypal() {
    this.display = true;

    setTimeout(() => {
      this.renderPaypalButtons();
    }, 100); 
  }

  renderPaypalButtons() {
    const container = document.getElementById('paypal-buttons-container');
    if (container) container.innerHTML = '';

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    paypal
      .Buttons({
        createOrder: (data: any, actions: any) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: '0.01',
                },
              },
            ],
          });
        },
        onApprove: (data: any, actions: any) => {
          return actions.order.capture().then((details: any) => {
            console.log('Pago completado: ', details);
            this.display = false;
            this.pago.referenciaPago = details.id;
            this.btnEnvRequest();
          });
        },
        onCancel: (data: any) => {
          console.log('Pago cancelado');
          console.log(data);
          this.display = false;
        },
        onError: (err: any) => {
          console.error('Error en PayPal: ', err);
          this.display = false;
        },
      })
      .render('#paypal-buttons-container');
  }
}
