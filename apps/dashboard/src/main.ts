import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { DashboardModule } from './app/dashboard.module';

const isProd = window.location.hostname !== 'localhost';
const envFile = isProd ? 'environment.prod' : 'environment';

fetch(`/environments/${envFile}.ts`)
  .then((r) => r.json())
  .then((config) => {
    (window as any).__env = config;
    platformBrowserDynamic()
      .bootstrapModule(DashboardModule, {
        ngZoneEventCoalescing: true,
      })
      .catch(console.error);
  });
