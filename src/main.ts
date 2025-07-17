import { bootstrapApplication } from '@angular/platform-browser';
import { registerLocaleData } from '@angular/common';
import localeEsMx from '@angular/common/locales/es-MX';
import {
  RouteReuseStrategy,
  provideRouter,
  withPreloading,
  PreloadAllModules,
} from '@angular/router';
import {
  IonicRouteStrategy,
  provideIonicAngular,
} from '@ionic/angular/standalone';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';

import { environment } from './environments/environment';

import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { enableProdMode, importProvidersFrom, LOCALE_ID } from '@angular/core';
import { defineCustomElements } from '@ionic/pwa-elements/loader';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

registerLocaleData(localeEsMx);

defineCustomElements(window);
if (environment.production) {
  enableProdMode();
} else {
  console.warn({ environment });
}

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    // Configura HttpClient con nuestro interceptor funcional
    provideHttpClient(withFetch()),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    importProvidersFrom(
      BrowserAnimationsModule,
      CalendarModule.forRoot({
        provide: DateAdapter,
        useFactory: adapterFactory,
      })
    ),
    { provide: LOCALE_ID, useValue: 'es-MX' },
  ],
});
