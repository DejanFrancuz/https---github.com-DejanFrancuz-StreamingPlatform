import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { UsersListComponent } from './users-list/users-list.component';

@NgModule({
  declarations: [UsersListComponent],
  imports: [
    BrowserModule,
    RouterModule.forChild(
      [
        {
          path: '',
          redirectTo: 'list',
          pathMatch: 'full'
        },
        {
          path: 'list',
          component: UsersListComponent
        }
      ],
    ),
  ],
  providers: [],
  exports: [UsersListComponent],
})
export class UsersModule {}
