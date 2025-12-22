import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '@stream-platform/auth-data-access';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  private refreshing = false;

  constructor(private router: Router, private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authReq = req.clone({ withCredentials: true });
    return next.handle(authReq).pipe(
      catchError((err: HttpErrorResponse) => {
        // u slucaju da dobijemo 401 gresku, preusmeravamo korisnika na login stranicu
        if (err.status === 401 && !this.refreshing) {
          this.refreshing = true;

          return this.authService.refresh().pipe(
            switchMap(() => {
              this.refreshing = false;
              return next.handle(authReq);
            }),
            catchError(() => {
              this.refreshing = false;
              this.router.navigate(['/login']);
              return throwError(() => err);
            })
          );
        }
        return throwError(() => err);
      })
    );
  }
}
