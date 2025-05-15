import { Route } from '@angular/router';
import { PersonalInfoComponent } from './personal-info/personal-info.component';
import { ConsultarPersonasComponent } from './personal-info/consultar-personas/consultar-persona.component';
import { ActualizarInformacionComponent } from './personal-info/actualizar-informacion/actualizar-informacion.component';

export const personalInfoRoutes: Route[] = [
  { path: '', component: PersonalInfoComponent },
  { path: 'personal-info', component: PersonalInfoComponent },
  { path: 'consultar-personas', component: ConsultarPersonasComponent },
  { path: 'actualizar-informacion/:id', component: ActualizarInformacionComponent}
];
