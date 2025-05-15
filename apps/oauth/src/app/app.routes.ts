import { Route } from '@angular/router';
import { AppLayoutComponent } from './layout/app.layout.component';
import {
  ActualizarInformacionComponent,
  ConsultarPersonasComponent,
  PersonalInfoComponent,
} from '@oauth/personal-info';
import { LoginComponent } from '@oauth/login';
import {
  DashboardMlComponent,
  DashboardMlRhComponent,
  DashboardOdonComponent,
} from '@oauth/dashboard-ml';
import {
  InformacionPacienteComponent,
  RegistrarPacienteComponent,
  HistorialInfoComponent,
  HistorialClinicoComponent,
  ArchivoInfoComponent
} from '@oauth/informacion-paciente';
import {
  DoctorInfoComponent,
  ManTratatientoDialogComponent,
  OdontogramaInfoComponent,
  VisualizazOdontogramaInfoComponent,
} from '@oauth/doctor-info';
import {
  CitaInfoComponent,
  CalendarioInfoComponent,
  HistorialCitaComponent,
  PagoPaypalInfoComponent,
  PCitaInfoComponent
} from '@oauth/cita-info';

export const appRoutes: Route[] = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'personal-info',
    component: AppLayoutComponent,
    children: [
      { path: '', component: PersonalInfoComponent },
      { path: 'consultar-personas', component: ConsultarPersonasComponent },
      {
        path: 'actualizar-informacion/:id',
        component: ActualizarInformacionComponent,
      },
    ],
  },
  {
    path: 'dashboard-ml',
    component: AppLayoutComponent,
    children: [
      { path: '', component: DashboardMlComponent },
      { path: 'dashboard-ml-rh', component: DashboardMlRhComponent },
      { path: 'dashboard-odon', component: DashboardOdonComponent },
    ],
  },
  {
    path: 'informacion-paciente',
    component: AppLayoutComponent,
    children: [
      { path: '', component: InformacionPacienteComponent },
      { path: 'registrar-paciente/:id', component: RegistrarPacienteComponent },
      { path: 'historial-info', component: HistorialInfoComponent },
      { path: 'historial-clinico', component: HistorialClinicoComponent },
      { path: 'archivo-info', component: ArchivoInfoComponent },
    ],
  },
  {
    path: 'doctor-info',
    component: AppLayoutComponent,
    children: [
      { path: '', component: DoctorInfoComponent },
      { path: 'man-tratamiento', component: ManTratatientoDialogComponent },
      { path: 'odontograma-info/:id', component: OdontogramaInfoComponent },
      {
        path: 'visualizar-odontograma-info/:id',
        component: VisualizazOdontogramaInfoComponent,
      },

      //{ path: 'registrar-paciente/:id', component: RegistrarPacienteComponent},
    ],
  },
  {
    path: 'cita-info',
    component: AppLayoutComponent,
    children: [
      { path: '', component: CitaInfoComponent },
      { path: 'calendario-info', component: CalendarioInfoComponent },
      { path: 'historial-cita', component: HistorialCitaComponent },
      // { path: 'pago-paypal-info', component: PagoPaypalInfoComponent },
      { path: 'pago-paypal-info/:id', component: PagoPaypalInfoComponent },
      { path: 'p-cita-info', component: PCitaInfoComponent },

      //{ path: 'registrar-paciente/:id', component: RegistrarPacienteComponent},
    ],
  },
];
