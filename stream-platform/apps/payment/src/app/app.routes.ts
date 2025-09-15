import { Route } from '@angular/router';
import { MoviePaymentComponent } from './payment/movie-payment/movie-payment.component';

export const appRoutes: Route[] = [
  {
        path: 'movie-payment/:movieId',
        component: MoviePaymentComponent
    }
];
