import { Component, inject, signal, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { Product } from '../../interfaces/product';
import { MatDialog } from '@angular/material/dialog';
import { DeleteProductDialog } from '../delete-product-dialog/delete-product-dialog';
import { AddToCartButton } from '../../../shopping-cart/components/add-to-cart-button/add-to-cart-button';

@Component({
  selector: 'app-product-details',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    CurrencyPipe,
    DatePipe,
    AddToCartButton
  ],
  templateUrl: './product-details.html',
  styleUrl: './product-details.scss',
  host: {
    '[class.product-details-container]': 'true'
  }
})
export class ProductDetails implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private productService = inject(ProductService);
  #dialog = inject(MatDialog);

  product = signal<Product | null>(null);

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    if (!productId) return;

    this.#getProductById(Number(productId));
  }
  
  #getProductById(productId: number): void {
    if (!productId) return;

    this.productService.getProduct(Number(productId)).subscribe({
      next: (product) => {
        this.product.set(product);
      },
    });
  }
  openDeleteConfirmation(): void {
    this.#dialog.open(DeleteProductDialog, {
      data: {
        id: this.product()!.id
      }
    });
  }
  editProduct(): void {
    if(!this.product()) return;
    const dialogRef = this.productService.openAddEditProductDialog(this.product()!);
    if(dialogRef) {
      dialogRef.afterClosed().subscribe({
        next: (product: Product | null) => {
          if(product) {
            this.product.set(product);
          }
        }
      });
    }
  }
  backToProducts(): void {
    this.router.navigate(['/products/list']);
  }
}
