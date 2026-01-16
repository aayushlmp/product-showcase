import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/assignment',
    pathMatch: 'full'
  },
  {
      path: 'products',
      loadChildren: () =>
        import('./products/routes/product.routes').then((m) => m.PRODUCT_ROUTES),
  },
  {
    path: 'assignment',
    loadComponent: () => import('./components/assignment/assignment.component').then(m => m.AssignmentComponent)
  },
  {
    path: 'view-cart',
    loadComponent: () => import('./shopping-cart/components/view-cart/view-cart').then(m => m.ViewCart)
  },
  {
    path: '**',
    redirectTo: '/products'
  }
];
