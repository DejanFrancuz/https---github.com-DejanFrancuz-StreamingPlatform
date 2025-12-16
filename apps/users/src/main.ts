import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { UsersModule } from './app/users.module';

const isProd = window.location.hostname !== 'localhost';
const envFile = isProd ? 'environment.prod' : 'environment';

fetch(`/environments/${envFile}.ts`)
  .then((r) => r.json())
  .then((config) => {
    (window as any).__env = config;
    platformBrowserDynamic()
      .bootstrapModule(UsersModule, {
        ngZoneEventCoalescing: true,
      })
      .catch(console.error);
  });
