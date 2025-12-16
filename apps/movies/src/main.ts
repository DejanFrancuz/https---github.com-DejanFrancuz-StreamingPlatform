import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { MoviesModule } from './app/movies.module';

const isProd = window.location.hostname !== 'localhost';
const envFile = isProd ? 'environment.prod' : 'environment';

fetch(`/environments/${envFile}.ts`)
  .then((r) => r.json())
  .then((config) => {
    (window as any).__env = config;
    platformBrowserDynamic()
      .bootstrapModule(MoviesModule, {
        ngZoneEventCoalescing: true,
      })
      .catch(console.error);
  });
