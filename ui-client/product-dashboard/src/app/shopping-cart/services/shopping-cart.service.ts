import { computed, inject, Injectable, signal } from '@angular/core';
import { Product } from '../../products/interfaces/product';
import { SnackbarService } from '../../services/snackbar.service';
import { CartItem } from '../interfaces/cart-item';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  #snackbarService = inject(SnackbarService);
  #cartItems = signal<CartItem[]>([]);
  
  cartItems = computed<CartItem[]>(() => this.#cartItems());
  
  totalItems = computed<number>(() => 
    this.#cartItems().reduce((sum, item) => sum + item.quantity, 0)
  );
  
  totalAmount = computed<number>(() => 
    this.#cartItems().reduce((sum, item) => {
      const price = parseFloat(item.product.price) || 0;
      return sum + (price * item.quantity);
    }, 0)
  );

  addToCart(product: Product): void {
    const item: CartItem = { product, quantity: 1 };
    if(this.cartItems().findIndex(p => p.product.id === product.id) !== -1) {
      this.#snackbarService.success('Product already in cart');
      return;
    } else {
      this.#cartItems.update(items => [...items, item]);
      this.#snackbarService.success('Product added to cart');
    }
  }

  increaseQuantity(productId: number): void {
    this.#cartItems.update(items =>
      items.map(item =>
        item.product.id === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  }

  decreaseQuantity(productId: number): void {
    this.#cartItems.update(items => {
      const updatedItems = items.map(item =>
        item.product.id === productId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
      return updatedItems;
    });
  }

  removeItem(productId: number): void {
    this.#cartItems.update(items => items.filter(item => item.product.id !== productId));
    this.#snackbarService.success('Product removed from cart');
  }

  clearCart(): void {
    this.#cartItems.set([]);
  }
}