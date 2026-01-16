import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditProductDialog } from './add-edit-product-dialog';

describe('AddEditProductDialog', () => {
  let component: AddEditProductDialog;
  let fixture: ComponentFixture<AddEditProductDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditProductDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditProductDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
