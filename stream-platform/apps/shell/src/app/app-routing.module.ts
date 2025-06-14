import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { ShellLayoutComponent } from './layout/layout.component';

export const appRoutes: Route[] = [
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full',
  },
  {
    path: '',
    component: ShellLayoutComponent,
    children: [
      { path: '', component: ShellLayoutComponent },
      {
        path: 'users',
        loadChildren: () => import('users/Module').then((m) => m!.UsersModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
