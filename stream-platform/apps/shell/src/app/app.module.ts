import { UsersDataAccessModule } from '@stream-platform/users-data-access';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ShellLayoutComponent } from './layout/layout.component';
import { AppRoutingModule } from './app-routing.module';
import { CommonSharedUiModule } from '@stream-platform/common-shared-ui';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthDataAccessModule } from '@stream-platform/auth-data-access';

@NgModule({
  declarations: [AppComponent, ShellLayoutComponent],
  exports: [ShellLayoutComponent],
  imports: [BrowserModule, AppRoutingModule, MatProgressSpinnerModule, CommonSharedUiModule,StoreModule.forRoot({}, {}), EffectsModule.forRoot([]), AuthDataAccessModule, UsersDataAccessModule],
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    {
    provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
  },
],
  bootstrap: [ShellLayoutComponent]
})

export class AppModule {
}
