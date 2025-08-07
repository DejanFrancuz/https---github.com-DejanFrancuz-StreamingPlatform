import { Component, OnDestroy, OnInit } from '@angular/core';
import { User, UserFacade } from '@stream-platform/users-data-access';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { passwordsMatchValidator } from '../validators/password.validator';

@Component({
  selector: 'app-edit-user',
  standalone: false,
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.css',
})
export class EditUserComponent implements OnInit, OnDestroy {
  userId!: number;

  private unsubscribe$ = new Subject<void>();

  changePassword = new FormControl(false);

  // passwordGroup = new FormGroup({
  //   password: new FormControl('', []),
  //   confirmPassword: new FormControl('', [])
  // }, { validators: passwordsMatchValidator });

  editForm = new FormGroup(
    {
      email: new FormControl('', [Validators.required, Validators.email]),
      username: new FormControl('', [Validators.required]),
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      permissions: new FormControl([''], [Validators.required]),

      changePassword: new FormControl(false),
      password: new FormControl(''),
      confirmPassword: new FormControl(''),
    },
    { validators: passwordsMatchValidator }
  );

  constructor(private userFacade: UserFacade, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.userId = Number(this.route.snapshot.paramMap.get('userId'));

    this.userFacade.getUserById(this.userId);

    this.userFacade.selectSelectedUser$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((user) => {
        if (user) {
          this.editForm.patchValue({
            username: user.username,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            permissions: user.permissions,
          });
        }
      });
  }

  onSubmit() {
    if (!this.editForm.valid) return;

    const { email, username, firstName, lastName, permissions, changePassword, password } =
      this.editForm.value;

    if (
      email == null ||
      username == null ||
      firstName == null ||
      lastName == null ||
      permissions == null ||
      password == null
    ) {
      console.error(
        'Neka polja su null/undefined i forma ne bi trebalo da je validna.'
      );
      return;
    }
    const user: User = {
      userId: this.userId,
      email,
      username,
      firstName,
      lastName,
      permissions,
    };

    if (password.trim() && changePassword) {
      user.password = password;
    }

    this.userFacade.updateUser(user);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
