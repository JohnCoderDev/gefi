import { Component, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-alert-snackbar',
  imports: [],
  templateUrl: './alert-snackbar.component.html',
  styleUrl: './alert-snackbar.component.scss'
})
export class AlertSnackbarComponent {
  private _snackBar = inject(MatSnackBar);
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
}
