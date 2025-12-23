import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, filter, finalize, switchMap, take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '@stream-platform/auth-data-access';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  private refreshing = false;

  private refreshSubject = new Subject<boolean>();

  constructor(private router: Router, private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authReq = req.clone({ withCredentials: true });

    if (req.url.includes('/auth/login') ||
        req.url.includes('/auth/refresh') ||
        req.url.includes('/auth/logout')) {
      return next.handle(authReq);
    }

    return next.handle(authReq).pipe(
      catchError((err: HttpErrorResponse) => {

        if (err.status !== 401) {
          return throwError(() => err);
        }

        if (this.refreshing) {
          return this.refreshSubject.pipe(
            filter(done => done),
            take(1),
            switchMap(() => next.handle(authReq))
          );
        }

        this.refreshing = true;

        return this.authService.refresh().pipe(
          switchMap(() => {
            this.refreshing = false;
            this.refreshSubject.next(true);
            return next.handle(authReq);
          }),
          catchError(() => {
            this.refreshing = false;
            this.refreshSubject.next(false);

            return this.authService.logout().pipe(
              finalize(() => this.router.navigate(['/login'])),
              switchMap(() => throwError(() => err))
            );
          })
        );
      })
    );
  }
}
