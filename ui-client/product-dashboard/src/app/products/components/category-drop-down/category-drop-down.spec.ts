import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryDropDown } from './category-drop-down';

describe('CategoryDropDown', () => {
  let component: CategoryDropDown;
  let fixture: ComponentFixture<CategoryDropDown>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoryDropDown]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryDropDown);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
