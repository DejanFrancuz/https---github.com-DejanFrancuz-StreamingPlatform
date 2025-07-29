import { Route } from '@angular/router';
import { MoviesListComponent } from './movies/movies-list/movies-list.component';

export const appRoutes: Route[] =
[
        {
          path: '',
          redirectTo: 'list',
          pathMatch: 'full'
        },
        {
          path: 'list',
          component: MoviesListComponent
        }
      ]
      ;
