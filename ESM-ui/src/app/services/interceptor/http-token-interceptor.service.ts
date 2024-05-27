import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { TokenService } from '../token/token.service';
import { Router } from '@angular/router';
import { SnackbarService } from '../snackbar/snackbar.service';

@Injectable({
  providedIn: 'root',
})
export class HttpTokenInterceptorService implements HttpInterceptor {
  constructor(
    private tokenService: TokenService,
    private router: Router,
    private snackBar: SnackbarService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (req.url.endsWith('/login')) {
      return next.handle(req);
    }
    const token = this.tokenService.token;
    if (token) {
      const authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
      return next.handle(authReq).pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 403) {
            this.tokenService.removeToken();
            this.router.navigate(['/login']);
            this.snackBar.openSnackBar('Session expired', 'error', 5000);
          }
          return throwError(() => error);
        })
      );
    }
    this.router.navigate(['/login']);
    this.snackBar.openSnackBar('Unauthorized', 'error', 1000);
    return next.handle(req);
  }

}
