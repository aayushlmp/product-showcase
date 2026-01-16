// src/app/services/category.service.ts
import { Injectable, inject, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { PaginatedResponse } from '../interfaces/common';
import { Category } from '../interfaces/category';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  categories = signal<Category[]>([]);
  private apiService = inject(ApiService);

  private endpoint = '/api/categories';

  fetchCategories(): void {
    this.getCategories().subscribe({
      next: (response: PaginatedResponse<Category>) => {
        this.categories.set(response.results);
      },
      error: (error: HttpErrorResponse) => {
        console.error(error);
      }
    });
  }
  fetchCategoryById(id: number): Category | null {
    const category = this.categories().find((category) => category.id === id);
    return category ?? null;
  }
  /**
   * Get all categories
   */
  getCategories(): Observable<PaginatedResponse<Category>> {
    return this.apiService.get<PaginatedResponse<Category>>(`${this.endpoint}/`);
  }

  /**
   * Get a single category
   */
  getCategory(id: number): Observable<Category> {
    return this.apiService.get<Category>(`${this.endpoint}/${id}/`);
  }

  /**
   * Create a new category
   */
  createCategory(category: Partial<Category>): Observable<Category> {
    return this.apiService.post<Category>(`${this.endpoint}/`, category);
  }

  /**
   * Update a category
   */
  updateCategory(id: number, category: Partial<Category>): Observable<Category> {
    return this.apiService.put<Category>(`${this.endpoint}/${id}/`, category);
  }

  /**
   * Delete a category
   */
  deleteCategory(id: number): Observable<void> {
    return this.apiService.delete<void>(`${this.endpoint}/${id}/`);
  }
}