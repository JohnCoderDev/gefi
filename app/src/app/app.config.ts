import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, } from '@angular/material/form-field';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { provideHttpClient, withFetch, withInterceptors, withJsonpSupport } from '@angular/common/http';
import { gefiApiInterceptor } from '../interceptors/gefi-api.interceptor';
import { ErrorStateMatcher, MAT_DATE_LOCALE, ShowOnDirtyErrorStateMatcher } from '@angular/material/core';
import { provideEnvironmentNgxMask } from 'ngx-mask';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'outline', floatLabel: 'always' } },
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 2500 } },
    { provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher },
    { provide: MAT_DATE_LOCALE, useValue: 'pt-br' },
    provideEnvironmentNgxMask(),
    provideHttpClient(
      withFetch(),
      withJsonpSupport(),
      withInterceptors([gefiApiInterceptor]),
    )
  ]
};

