import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductWrapper } from './product-wrapper';

describe('ProductWrapper', () => {
  let component: ProductWrapper;
  let fixture: ComponentFixture<ProductWrapper>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductWrapper]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductWrapper);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
