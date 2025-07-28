import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { ShellLayoutComponent } from './layout/layout.component';

export const appRoutes: Route[] = [
// {
    // path: '',
    // component: ShellLayoutComponent,
    // children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'auth', 
        loadChildren: () => import('auth/Module').then((m) => m.AuthModule),
      },
      {
        path: 'dashboard',
        loadChildren: () => import('dashboard/Module').then((m) => m.DashboardModule),
      },
      {
        path: 'users',
        loadChildren: () => import('users/Module').then((m) => m.UsersModule),
      },
    // ],
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
