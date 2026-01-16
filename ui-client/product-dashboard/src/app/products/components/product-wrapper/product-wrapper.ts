import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CategoryService } from '../../../services/category.service';

@Component({
  selector: 'app-product-wrapper',
  imports: [RouterOutlet],
  templateUrl: './product-wrapper.html',
  styleUrl: './product-wrapper.scss',
})
export class ProductWrapper implements OnInit {
  #categoryService = inject(CategoryService);

  ngOnInit(): void {
    this.#categoryService.fetchCategories();
  }
}
