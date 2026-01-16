import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddToCartButton } from './add-to-cart-button';

describe('AddToCartButton', () => {
  let component: AddToCartButton;
  let fixture: ComponentFixture<AddToCartButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddToCartButton]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddToCartButton);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
