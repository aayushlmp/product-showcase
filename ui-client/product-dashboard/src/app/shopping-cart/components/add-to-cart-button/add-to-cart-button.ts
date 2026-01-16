import { Component, inject, input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatAnchor } from "@angular/material/button";
import { Product } from '../../../products/interfaces/product';
import { ShoppingCartService } from '../../services/shopping-cart.service';

@Component({
  selector: 'app-add-to-cart-button',
  imports: [MatIcon, MatAnchor],
  templateUrl: './add-to-cart-button.html',
  styleUrl: './add-to-cart-button.scss',
})
export class AddToCartButton {
  #shoppingCartService = inject(ShoppingCartService);
  product = input.required<Product>();

  addToCart(): void {
    if(this.product()) {
      this.#shoppingCartService.addToCart(this.product());
    }
  }
}
