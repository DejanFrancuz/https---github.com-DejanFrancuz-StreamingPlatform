import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { UserFacade } from '@stream-platform/users-data-access'
import { User } from 'libs/users/data-access/src/lib/models/User';

@Component({
  selector: 'app-users-list',
  standalone: false,
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css'
})
export class UsersListComponent {

  users: User[] | null = [];
  authorities: string[] | null = [];

  constructor(private userFacade: UserFacade) {

  }

  ngOnInit(): void {
    this.userFacade.getUsers();

    this.userFacade.selectUsers$.subscribe(( users ) => {
      this.users = users
    });
  }

  hasPermission(permission: string): boolean {
    const authorities = localStorage.getItem('authorities');
    if (authorities !== null) {
      if (authorities.includes(permission)) {
        return true;
      }
    }
    return false;
  }

  deleteUser(id: number) {
    this.userFacade.deleteUser(id);
  }
}
