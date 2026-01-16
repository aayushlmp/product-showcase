import { Component, ChangeDetectionStrategy, inject, input, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ProductModel } from '../../interfaces/product';  
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormField, FieldTree} from '@angular/forms/signals';
import { NumberOnlyDirective } from '../../../directives/number-only.directive';
import { CategoryService } from '../../../services/category.service';
import { Category } from '../../../interfaces/category';
import { UploadFile } from '../../../components/upload-file/upload-file';
import { ProductService } from '../../services/product.service';
import { UploadResponse } from '../../../interfaces/common';
import { SnackbarService } from '../../../services/snackbar.service';

@Component({
  selector: 'app-product-form',
  imports: [FormsModule, FormField, MatInputModule, MatIconModule, MatSelectModule, MatSlideToggleModule, NumberOnlyDirective, UploadFile],
  templateUrl: './product-form.html',
  styleUrl: './product-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductForm {
  #categoryService = inject(CategoryService);
  #productService = inject(ProductService);
  #snackBarService = inject(SnackbarService);
  form = input.required<FieldTree<ProductModel>>();
  categories = computed<Category[]>(() => this.#categoryService.categories());
  imageURL = computed<string | null>(() => this.form()?.image_url?.()?.value() ?? null);
  
  onFileSelected(file: File | null) {
    if(file) {
      this.#productService.uploadFile(file).subscribe({
        next: (response: UploadResponse) => {
          this.form()?.image_url?.()?.value?.update((url: string | null) => url = response.url);
          this.#snackBarService.success('Image uploaded successfully');
        },
        error: (error: any) => {
          console.error(error);
        }
      });
    }
  }
  removeFile() {
    this.form()?.image_url?.()?.value?.update((value: string) => value = '');
  }
}
