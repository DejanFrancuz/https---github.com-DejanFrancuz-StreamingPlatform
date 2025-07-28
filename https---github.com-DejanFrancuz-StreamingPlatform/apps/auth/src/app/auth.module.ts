import { Injector, NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { CommonSharedUiModule } from '@stream-platform/common-shared-ui';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [LoginComponent],
  imports: [CommonModule, ReactiveFormsModule, AuthRoutingModule, MatProgressSpinnerModule,
     CommonSharedUiModule
    ],
  providers: [],
  exports: [LoginComponent]
})
export class AuthModule {
}
