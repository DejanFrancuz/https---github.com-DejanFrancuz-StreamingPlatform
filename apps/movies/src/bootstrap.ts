import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { MoviesModule } from './app/movies.module';

platformBrowserDynamic()
  .bootstrapModule(MoviesModule)
  .catch(console.error);
