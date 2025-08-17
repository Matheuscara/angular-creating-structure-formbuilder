import {
  ApplicationConfig, isDevMode,
  provideBrowserGlobalErrorListeners, provideCheckNoChangesConfig, provideZoneChangeDetection,
  provideZonelessChangeDetection
} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    isDevMode() ? provideCheckNoChangesConfig({
      exhaustive: true,
      interval: 1000
    }) : [],
  ]
};
