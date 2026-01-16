export interface Product {
  id: number;
  title: string;
  description: string;
  category: number;
  category_name?: string;
  price: string;
  is_featured: boolean;
  image_url?: string;
  created_at: string;
  updated_at: string;
}

export interface ProductFilters {
  category?: number;
  is_featured?: boolean;
  search?: string;
  ordering?: string;
  page?: number;
  total?: number;
  page_size?: number;
}
export interface ProductModel {
  title: string;
  description: string;
  category: number | string | null;
  price: string;
  is_featured: boolean;
  image_url?: string;
}