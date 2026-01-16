import { Component, inject, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { ProductForm } from '../product-form/product-form';
import { form, required, maxLength, submit } from '@angular/forms/signals';
import { Product, ProductModel } from '../../interfaces/product';
import { ProductService } from '../../services/product.service';
import { SnackbarService } from '../../../services/snackbar.service';

@Component({
  selector: 'app-add-edit-product-dialog',
  imports: [MatDialogContent, MatDialogActions, MatButtonModule, MatDialogClose, MatDialogTitle, ProductForm],
  templateUrl: './add-edit-product-dialog.html',
  styleUrl: './add-edit-product-dialog.scss',
})
export class AddEditProductDialog implements OnInit {
  #dialogRef = inject(MatDialogRef<AddEditProductDialog>);
  #snackbarService = inject(SnackbarService);
  #productService = inject(ProductService);
  #productModel = signal<ProductModel>({
    title: '',
    description: '',
    category: '',
    price: '',
    is_featured: false,
    image_url: ''
  });
  productForm = form(this.#productModel, (schema) => {
    required(schema.title, {message: 'Title is required'});
    required(schema.description, {message: 'Description is required'});
    required(schema.price, {message: 'Price is required'});
    required(schema.category, {message: 'Category is required'});
    maxLength(schema.description, 500, {message: 'Description must be less than 500 characters'});
  });
  product = inject<{product: Product | null}>(MAT_DIALOG_DATA)?.product as Product | null;

  ngOnInit(): void {
    if(this.product?.id) {
      this.#productModel.set(this.product);
    }
  }

  saveClickHandler() {
     submit(this.productForm, async () => {
      if(this.product?.id) {
        this.#update();
      } else {
        this.#save();
      }
    });
  }
  #showSnackbar(message: string = 'Product saved successfully') {
    this.#snackbarService.success(message);
  }
  
  #save() {
    const payload = this.#productService.getProductPayload(this.#productModel());
    this.#productService.createProduct(payload as Partial<Product>).subscribe({
      next: (response: Product) => {
        this.#showSnackbar('Product created successfully');
        this.#dialogRef.close(response);
      },
      error: (error) => {
        this.#snackbarService.error('Failed to save product');
      }
    });
  }
  #update() {
    const payload = this.#productService.getProductPayload(this.#productModel());
    this.#productService.updateProduct(this.product?.id as number, payload as Partial<Product>).subscribe({
      next: (response: Product) => {
        this.#showSnackbar('Product updated successfully');
        this.#dialogRef.close(response);
      },
      error: (error) => {
        this.#snackbarService.error('Failed to update product');
      }
    });
  }

}
