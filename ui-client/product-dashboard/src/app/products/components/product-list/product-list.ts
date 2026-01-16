import { ChangeDetectionStrategy, Component, computed, inject, input, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Product } from '../../interfaces/product';
import { ProductCard } from '../product-card/product-card';
import { ProductService } from '../../services/product.service';
import { PaginatedResponse } from '../../../interfaces/common';
import { MatDialogModule } from '@angular/material/dialog';
import { CategoryDropDown } from '../category-drop-down/category-drop-down';
import { Category } from '../../../interfaces/category';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { Spinner } from '../../../components/spinner/spinner';

@Component({
  selector: 'app-product-list',
  imports: [ProductCard, MatButtonModule, MatSlideToggleModule, MatIconModule, MatDialogModule, CategoryDropDown, Spinner],
  templateUrl: './product-list.html',
  styleUrl: './product-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductList implements OnInit{
  #productService = inject(ProductService);
  #selectedCategory = signal<number | null>(null);

  filteredProducts = computed(() => {
    if(this.#selectedCategory()) {
      return this.#productService.products().filter((product) => product.category === this.#selectedCategory());
    }
    return this.#productService.products();
  });

  ngOnInit(): void {
    this.#productService.getProducts().subscribe({
      next: (response: PaginatedResponse<Product>) => {
        if(response.results) {
          this.#productService.products.set(response.results);
        }
      },
      error: (error) => {
        console.error(error);
      }
    });
  }
  addProduct(): void {
    const dialogRef = this.#productService.openAddEditProductDialog();
    dialogRef.afterClosed().subscribe({
      next: (product: Product | null) => {
        if(product) {
          this.#productService.updateProducts(product, 'create');
        }
      }
    });
  }
  categoryChange(category: Pick<Category, 'id' | 'name'> | null): void {
    this.#selectedCategory.set(category?.id ? Number(category.id) : null);
  }
  featuredChange(event: Event): void {
    const isFeatured = (event.target as HTMLInputElement).checked;
    
  }
}
