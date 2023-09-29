import { ComponentFixture, TestBed } from '@angular/core/testing';

import { I360PageComponent } from './i360-page.component';

describe('I360PageComponent', () => {
  let component: I360PageComponent;
  let fixture: ComponentFixture<I360PageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [I360PageComponent]
    });
    fixture = TestBed.createComponent(I360PageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
