import { Component, computed, inject, OnInit, output } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { CategoryService } from '../../../services/category.service';
import { Category } from '../../../interfaces/category';

@Component({
  selector: 'app-category-drop-down',
  imports: [MatFormFieldModule, MatSelectModule],
  templateUrl: './category-drop-down.html',
  styleUrl: './category-drop-down.scss',
})
export class CategoryDropDown implements OnInit {
  #categoryService = inject(CategoryService);
  categories = computed<Category[]>(() => this.#categoryService.categories());
  categoryChange = output<Pick<Category, 'id' | 'name'> | null>();
  ngOnInit(): void {
    if(!this.categories().length) {
      this.#categoryService.fetchCategories();
    }
  }
  selectCategory(event: MatSelectChange) {
    const category = event.value as Category;
    const categoryValue = category ? { id: category.id, name: category.name } : null;
    this.categoryChange.emit(categoryValue);
  }
}
