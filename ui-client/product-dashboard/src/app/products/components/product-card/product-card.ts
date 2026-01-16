import { Component, input, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { Product } from '../../interfaces/product';
import { CurrencyPipe } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { MatChipsModule } from '@angular/material/chips';
import { AddToCartButton } from "../../../shopping-cart/components/add-to-cart-button/add-to-cart-button";

@Component({
  selector: 'app-product-card',
  imports: [MatCardModule, MatButtonModule, MatIconModule, RouterLink, CurrencyPipe, MatChipsModule, AddToCartButton],
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss',
})
export class ProductCard {
  product = input.required<Product>();
  #productService = inject(ProductService);

  editProduct(): void {
    const dialogRef = this.#productService.openAddEditProductDialog(this.product());
    if(dialogRef) {
      dialogRef.afterClosed().subscribe({
        next: (product: Product | null) => {
          if(product) {
            this.#productService.updateProducts(product, 'update');
          }
        }
      });
    }
  }
}
