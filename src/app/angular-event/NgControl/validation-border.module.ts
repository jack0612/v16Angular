import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ValidationBorderDirective } from './inject-NgControl.directive';
 

import { ValidationBorderConfig, VALIDATION_BORDER_CONFIG } from './public_api';

//https://netbasal.com/attribute-directives-angular-forms-b40503643089
@NgModule({
  imports: [CommonModule, FormsModule,ReactiveFormsModule],
  declarations: [ValidationBorderDirective],
  exports: [ValidationBorderDirective]
})
export class ValidationBorderModule {
  static forRoot(config: ValidationBorderConfig) {
    return {
      ngModule: ValidationBorderModule,
      providers: [{ provide: VALIDATION_BORDER_CONFIG, useValue: config }]
    };
  }
}