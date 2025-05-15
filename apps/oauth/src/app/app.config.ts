import { ApplicationConfig, provideZoneChangeDetection  } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';

import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { PrimeNGConfig } from 'primeng/api';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { HttpErrorInterceptor } from './layout/sensorToken/http-error.interceptor';


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),  
    provideAnimationsAsync(),
    //provideHttpClient(), //Sin interceptores
    PrimeNGConfig,
    provideHttpClient(withInterceptors([HttpErrorInterceptor]))
  ],
  
};
