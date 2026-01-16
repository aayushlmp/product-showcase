import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCart } from './view-cart';

describe('ViewCart', () => {
  let component: ViewCart;
  let fixture: ComponentFixture<ViewCart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewCart]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewCart);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
