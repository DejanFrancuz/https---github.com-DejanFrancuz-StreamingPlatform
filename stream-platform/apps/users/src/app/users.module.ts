import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UsersListComponent } from './users-list/users-list.component';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { EditUserComponent } from './edit-user/edit-user.component'
import { ReactiveFormsModule } from '@angular/forms';
import { CommonSharedUiModule } from '@stream-platform/common-shared-ui';

@NgModule({
  declarations: [UsersListComponent, EditUserComponent],
  imports: [
    CommonModule,
    MatTableModule,
    ReactiveFormsModule, MatInputModule, MatSelectModule, MatFormFieldModule, MatCheckboxModule, CommonSharedUiModule, MatIconModule,
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
        },
        {
          path: 'edit/:userId',
          component: EditUserComponent
        }
      ],
    ),
  ],
  providers: [],
  exports: [UsersListComponent],
})
export class UsersModule {}
