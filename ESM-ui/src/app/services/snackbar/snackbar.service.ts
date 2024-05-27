import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  constructor(private _snackBar: MatSnackBar) {}

  openSnackBar(message: string, action: string, duration: number = 3000) {
    if (action === 'error') {
      this._snackBar.open(message, '', {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        duration: duration,
        panelClass: ['black-snackbar'],
      });
    } else {
      this._snackBar.open(message, '', {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        duration: duration,
        panelClass: ['green-snackbar'],
      });
    }
  }
}
