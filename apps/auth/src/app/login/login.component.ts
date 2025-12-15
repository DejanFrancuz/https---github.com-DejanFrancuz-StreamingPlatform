import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthFacade } from '@stream-platform/auth-data-access';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm: FormGroup;

  submitted = false;

  loading$!: Observable<boolean>;

  constructor(
    private fb: FormBuilder,
    private authFacade: AuthFacade,
  ) {

    this.loginForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', Validators.required],
    });
    this.authFacade.loaded$.subscribe((loaded) => {
      console.log("loading is " + loaded);
      this.loading$ = this.authFacade.loaded$;
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.authFacade.login(this.loginForm.value);
      this.submitted = true;
      this.loginForm.reset();
    }
  }
}
