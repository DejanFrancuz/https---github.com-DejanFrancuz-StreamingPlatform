import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthFacade } from '@stream-platform/auth-data-access';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit{
  loginForm: FormGroup;

  submitted: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authFacade: AuthFacade,
  ) {

    console.log('LoginModule initialized!');

    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    console.log("tu sam ne brini");
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.authFacade.login(this.loginForm.value);
      this.submitted = true;
      console.log("submitt " + this.submitted);
    }
  }

  onClear() {
    if (this.loginForm.valid) {
      // this.loginForm.;
    }
  }
}
