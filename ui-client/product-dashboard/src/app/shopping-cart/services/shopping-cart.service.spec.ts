import { TestBed } from '@angular/core/testing';

import { ShoppingCartService } from './shopping-cart.service';

describe('ShoppingCart', () => {
  let service: ShoppingCartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShoppingCartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
