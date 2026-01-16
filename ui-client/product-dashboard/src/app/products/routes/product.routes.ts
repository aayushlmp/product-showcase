import { Routes } from "@angular/router";
import { ProductWrapper } from "../components/product-wrapper/product-wrapper";

export const PRODUCT_ROUTES: Routes = [
  {
    path: '',
    component: ProductWrapper,
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
      },
      {
        path: 'list',
        loadComponent: () => import('../components/product-list/product-list').then(m => m.ProductList)
      },
      {
        path: 'details/:id',
        loadComponent: () => import('../components/product-details/product-details').then(m => m.ProductDetails)
      }
    ]
  },
];