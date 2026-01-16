import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteProductDialog } from './delete-product-dialog';

describe('DeleteProductDialog', () => {
  let component: DeleteProductDialog;
  let fixture: ComponentFixture<DeleteProductDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteProductDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteProductDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
