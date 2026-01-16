import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ShoppingCartService } from '../../services/shopping-cart.service';
import { SnackbarService } from '../../../services/snackbar.service';

@Component({
  selector: 'app-view-cart',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    CurrencyPipe,
    RouterLink,
  ],
  templateUrl: './view-cart.html',
  styleUrl: './view-cart.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewCart {
  #shoppingCartService = inject(ShoppingCartService);
  #snackbarService = inject(SnackbarService);

  cartItems = this.#shoppingCartService.cartItems;
  totalAmount = this.#shoppingCartService.totalAmount;
  totalItems = this.#shoppingCartService.totalItems;

  isEmpty = computed(() => this.cartItems().length === 0);

  getItemTotal(price: string, quantity: number): number {
    return (parseFloat(price) || 0) * quantity;
  }

  increaseQuantity(productId: number): void {
    this.#shoppingCartService.increaseQuantity(productId);
  }

  decreaseQuantity(productId: number): void {
    this.#shoppingCartService.decreaseQuantity(productId);
  }

  removeItem(productId: number): void {
    this.#shoppingCartService.removeItem(productId);
  }

  placeOrder(): void {
    if (this.isEmpty()) {
      this.#snackbarService.warning('Your cart is empty');
      return;
    }

    // TODO: Implement order placement logic
    this.#snackbarService.success('Order placed successfully!');
    this.#shoppingCartService.clearCart();
  }
}
