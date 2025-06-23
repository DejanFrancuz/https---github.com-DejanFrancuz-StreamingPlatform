import { APP_INITIALIZER, NgModule, provideAppInitializer } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ShellLayoutComponent } from './layout/layout.component';
import { AppRoutingModule } from './app-routing.module';
import { CommonSharedUiModule } from '@stream-platform/common-shared-ui';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { AppComponent } from './app.component';
import { AuthDataAccessModule, AuthFacade } from '@stream-platform/auth-data-access';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

export function initAuthFactory(authFacade: AuthFacade) {
  return () => authFacade.init();
}

@NgModule({
  declarations: [AppComponent, ShellLayoutComponent],
  exports: [ShellLayoutComponent],
  imports: [BrowserModule, AppRoutingModule, CommonSharedUiModule,StoreModule.forRoot({}, {}), EffectsModule.forRoot([]),   AuthDataAccessModule],
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    {
    provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
  },
  {
  provide: APP_INITIALIZER,
  useFactory: initAuthFactory,
  deps: [AuthFacade],
  multi: true
}
],
  bootstrap: [AppComponent]
})

export class AppModule {}
