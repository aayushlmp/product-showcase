// src/app/services/product.service.ts
import { Injectable, inject, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from '../../services/api.service';
import { Product, ProductFilters, ProductModel } from '../interfaces/product';
import { PaginatedResponse, UploadResponse } from '../../interfaces/common';
import { AddEditProductDialog } from '../components/add-edit-product-dialog/add-edit-product-dialog';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CategoryService } from '../../services/category.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  #dialog = inject(MatDialog);
  #categoryService = inject(CategoryService);
  products = signal<Product[]>([]);
  private apiService = inject(ApiService);
  private endpoint = '/api/products';
  /**
   * Get all products with optional filters
   */
  getProducts(filters?: ProductFilters): Observable<PaginatedResponse<Product>> {
    return this.apiService.get<PaginatedResponse<Product>>(
      `${this.endpoint}/`,
      filters
    );
  }

  /**
   * Get a single product by ID
   */
  getProduct(id: number): Observable<Product> {
    return this.apiService.get<Product>(`${this.endpoint}/${id}/`);
  }

  /**
   * Get featured products
   */
  getFeaturedProducts(): Observable<Product[]> {
    return this.apiService.get<Product[]>(`${this.endpoint}/featured/`);
  }

  /**
   * Create a new product
   */
  createProduct(product: Partial<Product>): Observable<Product> {
    return this.apiService.post<Product>(`${this.endpoint}/`, product);
  }

  /**
   * Update an existing product
   */
  updateProduct(id: number, product: Partial<Product>): Observable<Product> {
    return this.apiService.put<Product>(`${this.endpoint}/${id}/`, product);
  }

  /**
   * Partially update a product
   */
  patchProduct(id: number, data: Partial<Product>): Observable<Product> {
    return this.apiService.patch<Product>(`${this.endpoint}/${id}/`, data);
  }

  /**
   * Delete a product
   */
  deleteProduct(id: number): Observable<void> {
    return this.apiService.delete<void>(`${this.endpoint}/${id}/`);
  }

  /**
   * Search products
   */
  searchProducts(query: string): Observable<Product[]> {
    return this.getProducts({ search: query, page_size: 20 }).pipe(
      map(response => response.results)
    );
  }

  /**
   * Get products by category
   */
  getProductsByCategory(categoryId: number): Observable<Product[]> {
    return this.getProducts({ category: categoryId }).pipe(
      map(response => response.results)
    );
  }

  /**
   * Toggle featured status
   */
  toggleFeatured(id: number, isFeatured: boolean): Observable<Product> {
    return this.patchProduct(id, { is_featured: isFeatured });
  }

  /**
   * Upload a file
   */
  uploadFile(file: File): Observable<UploadResponse> {
    return this.apiService.uploadFile<UploadResponse>(`${this.endpoint}/upload/`, file);
  }
  openAddEditProductDialog(product?: Product | null): MatDialogRef<AddEditProductDialog> {
    return this.#dialog.open(AddEditProductDialog, {
      data: {
        product: product || null,
      },
    });
  }
  getProductPayload(product: ProductModel) {
    const category = this.#categoryService.fetchCategoryById(Number(product.category));
    if(category) {
      return {
        ...product,
        category: category.id,
        category_name: category.name,
      };
    }
    return null;
  }
  updateProducts(product: Product, action: 'update' | 'create') {
    this.products.update((products: Product[]) => {
      if(action === 'update') {
        return [...products.map((p: Product) => p.id === product.id ? product : p)];
      } else {
        return [...products, product];
      }
    });
  }
}
