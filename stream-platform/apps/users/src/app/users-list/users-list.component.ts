import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserFacade, User } from '@stream-platform/users-data-access'
import { Observable } from 'rxjs';

@Component({
  selector: 'app-users-list',
  standalone: false,
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css'
})
export class UsersListComponent implements OnInit {

  users$!: Observable<User[] | null>;
  authorities: string[] | null = [];
  displayedColumns: string[] = ['userId', 'username', 'firstName', 'lastName','email', 'role', 'actions'];

  constructor(private userFacade: UserFacade, private router: Router) {}

  roles = ['MEMBER', 'ADMIN'];

onRoleChange(user: User, newRole: string): void {

  const updatedUser = {
    ...user,
    permissions: [newRole]
  };

  this.userFacade.updateUser(updatedUser);
}

  ngOnInit(): void {
    this.userFacade.getUsers();

    this.users$ = this.userFacade.selectUsers$;
    }

    editUser(userId: number){
      this.router.navigateByUrl(`/edit/${userId}`)

    }

  deleteUser(id: number) {
    this.userFacade.deleteUser(id);
  }
}
