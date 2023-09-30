import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomTwoWayBindingComponent } from './custom-two-way-binding.component';

describe('CustomTwoWayBindingComponent', () => {
  let component: CustomTwoWayBindingComponent;
  let fixture: ComponentFixture<CustomTwoWayBindingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomTwoWayBindingComponent]
    });
    fixture = TestBed.createComponent(CustomTwoWayBindingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
