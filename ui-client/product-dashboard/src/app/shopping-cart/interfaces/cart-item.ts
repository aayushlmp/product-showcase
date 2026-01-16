import { Product } from '../../products/interfaces/product';

export interface CartItem {
  product: Product;
  quantity: number;
}

