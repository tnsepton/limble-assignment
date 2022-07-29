import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectListOptionComponent } from './select-list-option.component';

describe('SelectListOptionComponent', () => {
  let component: SelectListOptionComponent;
  let fixture: ComponentFixture<SelectListOptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectListOptionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectListOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
