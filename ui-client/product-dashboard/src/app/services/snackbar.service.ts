import { inject, Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarRef, TextOnlySnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
  private defaultConfig: MatSnackBarConfig = {
    duration: 5000,
    horizontalPosition: 'center',
    verticalPosition: 'top',
    panelClass: []
  };

  #snackBar = inject(MatSnackBar);

  /**
   * Show a success message
   */
  success(message: string, duration: number = 5000): MatSnackBarRef<TextOnlySnackBar> {
    return this.#snackBar.open(message, 'Close', {
      ...this.defaultConfig,
      duration: duration || this.defaultConfig.duration,
      panelClass: ['success-snackbar', ...this.defaultConfig.panelClass || []]
    });
  }

  /**
   * Show an error message
   */
  error(message: string, duration: number = 5000): MatSnackBarRef<TextOnlySnackBar> {
    return this.#snackBar.open(message, 'Close', {
      ...this.defaultConfig,
      duration: duration || this.defaultConfig.duration,
      panelClass: ['error-snackbar', ...this.defaultConfig.panelClass || []]
    });
  }

  /**
   * Show an info message
   */
  info(message: string, duration: number = 5000): MatSnackBarRef<TextOnlySnackBar> {
    return this.#snackBar.open(message, 'Close', {
      ...this.defaultConfig,
      duration: duration || this.defaultConfig.duration,
      panelClass: ['info-snackbar', ...this.defaultConfig.panelClass || []]
    });
  }

  /**
   * Show a warning message
   */
  warning(message: string, duration: number = 5000): MatSnackBarRef<TextOnlySnackBar> {
    return this.#snackBar.open(message, 'Close', {
      ...this.defaultConfig,
      duration: duration || this.defaultConfig.duration,
      panelClass: ['warning-snackbar', ...this.defaultConfig.panelClass || []]
    });
  }

  /**
   * Show a custom message with custom configuration
   */
  show(message: string, action: string = 'Close', config?: MatSnackBarConfig): MatSnackBarRef<TextOnlySnackBar> {
    return this.#snackBar.open(message, action, {
      ...this.defaultConfig,
      ...config
    });
  }
}

