import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectiveExportAsDirective } from './directive-export-as.component';

describe('DirectiveExportAsComponent', () => {
  let component: DirectiveExportAsDirective;
  let fixture: ComponentFixture<DirectiveExportAsDirective>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DirectiveExportAsDirective]
    });
    fixture = TestBed.createComponent(DirectiveExportAsDirective);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
