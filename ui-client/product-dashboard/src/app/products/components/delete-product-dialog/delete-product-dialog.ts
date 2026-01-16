import { Component, computed, inject, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarService } from '../../../services/snackbar.service';
@Component({
  selector: 'app-delete-product-dialog',
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './delete-product-dialog.html',
  styleUrl: './delete-product-dialog.scss',
})
export class DeleteProductDialog {
  #router = inject(Router);
  #productService = inject(ProductService);
  #snackbarService = inject(SnackbarService);
  #data = inject<{ id: string | number | null }>(MAT_DIALOG_DATA);
  #productId = computed(() => this.#data?.id);
  #dialogRef = inject(MatDialogRef<DeleteProductDialog>);
  delete(): void {
    if (!this.#productId()) return;
    this.#productService.deleteProduct(Number(this.#productId())).subscribe({
      next: () => {
        this.openSnackBar('Product deleted successfully');
        this.#dialogRef.close(true);
        this.#router.navigate(['/products/list']);
      }
    });
  }
  openSnackBar(message: string): void {
    this.#snackbarService.success(message);
  }
}
