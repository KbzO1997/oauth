import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from './service/app.layout.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { BadgeModule } from 'primeng/badge';
import { CitaService } from '@oauth/cita-info';
import { Util } from '@oauth/shared-config';

@Component({
  selector: 'app-topbar',
  templateUrl: './app.topbar.component.html',
  standalone: true,
  imports: [CommonModule, RouterModule, OverlayPanelModule, BadgeModule],
})
export class AppTopBarComponent implements OnInit {
  items!: MenuItem[];

  @ViewChild('menubutton') menuButton!: ElementRef;

  @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

  @ViewChild('topbarmenu') menu!: ElementRef;

  citasHoy: any[] = [];
   util: Util = new Util();

  constructor(public layoutService: LayoutService, private router: Router, private serv: CitaService) {}

  ngOnInit() {
    this.envConsultAll();
  }

  envConsultAll(): void {
    try {
        const id = this.util.getIdPersonSession();
        this.serv.envConsultNotificacionTransaction(id).subscribe({next: (resp) => {
            const hoy = new Date();
            this.citasHoy = resp;            

             this.citasHoy = resp.map((cita: any) => ({
                ...cita,
                fecha: new Date(cita.fecha), 
                hora: new Date(`1970-01-01T${cita.hora}`) 
            }));
                
            this.citasHoy = this.citasHoy.filter(
            (cita) => new Date(cita.fecha).toDateString() === hoy.toDateString()
            );
        }});
    } catch (error) {console.log(error);}    
  }

  btnCloseLogin(): void {
    sessionStorage.removeItem('id');
    sessionStorage.removeItem('nombre');
    sessionStorage.removeItem('token');
    this.router.navigate(['/']);
  }

  btnProfilePerson(): void {
    this.router.navigate(['/personal-info']);
  }
}
