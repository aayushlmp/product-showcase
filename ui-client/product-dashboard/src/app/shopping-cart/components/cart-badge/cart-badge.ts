import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ShoppingCartService } from '../../services/shopping-cart.service';

@Component({
  selector: 'app-cart-badge',
  imports: [MatIconModule, MatButtonModule, MatBadgeModule, RouterLink, RouterLinkActive],
  templateUrl: './cart-badge.html',
  styleUrl: './cart-badge.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartBadge {
  #shoppingCartService = inject(ShoppingCartService);
  cartItemCounter = computed<number>(() => this.#shoppingCartService.totalItems());
}
