import { Route } from '@angular/router';
import { MoviesListComponent } from './movies/movies-list/movies-list.component';
import { MoviesPaymentComponent } from './movies/movies-payment/movies-payment.component';
import { MovieViewComponent } from './movies/movie-view/movie-view.component';

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
        },
        {
          path: 'payment/:movieId',
          component: MoviesPaymentComponent
        },
        {
          path: 'view-movie/:movieId',
          component: MovieViewComponent
        }

      ]
      ;
