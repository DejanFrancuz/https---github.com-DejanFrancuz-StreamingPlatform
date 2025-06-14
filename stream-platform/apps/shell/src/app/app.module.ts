import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ShellLayoutComponent } from './layout/layout.component';
import { AppRoutingModule } from './app-routing.module';
import { CommonSharedUiModule } from '@stream-platform/common-shared-ui';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';

@NgModule({
  declarations: [ShellLayoutComponent],
  imports: [BrowserModule, AppRoutingModule, CommonSharedUiModule],
  providers: [{
    provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
  }],
})
export class AppModule {}
