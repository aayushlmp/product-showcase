import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartBadge } from './cart-badge';

describe('CartBadge', () => {
  let component: CartBadge;
  let fixture: ComponentFixture<CartBadge>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartBadge]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartBadge);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
