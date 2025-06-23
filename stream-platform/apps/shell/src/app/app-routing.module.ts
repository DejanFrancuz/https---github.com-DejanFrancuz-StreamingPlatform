import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { ShellLayoutComponent } from './layout/layout.component';

export const appRoutes: Route[] = [
{
    path: '',
    component: ShellLayoutComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      {
        path: 'users',
        loadChildren: () => import('users/Module').then((m) => m.UsersModule),
      },
      {
        path: 'login',
        loadChildren: () => import('login/Module').then((m) => m.LoginModule),
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
