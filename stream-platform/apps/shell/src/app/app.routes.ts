import { NxWelcomeComponent } from './nx-welcome.component';
import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    redirectTo: 'users',
    pathMatch: 'full'
  },
  {
    path: 'users',
    loadChildren: () =>
      import('users/Module').then((m) => m!.UsersModule),
  },
  {
    path: '',
    component: NxWelcomeComponent,
  },
];
