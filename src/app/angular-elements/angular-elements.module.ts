import { CUSTOM_ELEMENTS_SCHEMA, Injector, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularElementsComponent } from './angular-elements.component';
import { AwesomeElementComponent } from './awesome-element/awesome-element.component';
import { BrowserModule } from '@angular/platform-browser';
import { createCustomElement } from '@angular/elements';
import { CustomTwoWayBindingComponent } from './custom-two-way-binding/custom-two-way-binding.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { SanitizationComponent } from './sanitization/sanitization.component';
import { ContentChildComponent } from './content-child/content-child.component';
import { ChildComponent, ParentComponent, SimpleService, ViewProvidersComponent } from './view-providers/view-providers.component';
import { DirectiveExportAsDirective, MainComponent } from './directive-export-as/directive-export-as.component';


@NgModule({
  declarations: [
    AngularElementsComponent, 
    AwesomeElementComponent, 
    CustomTwoWayBindingComponent, 
    SanitizationComponent, 
    ContentChildComponent, 
    ViewProvidersComponent,
    ParentComponent,
    ChildComponent,
    DirectiveExportAsDirective,
    MainComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
  // entryComponents: [AwesomeElementComponent], // (1)
 
  schemas: [CUSTOM_ELEMENTS_SCHEMA], // (4)
  providers:[
    SimpleService
  ]
})
export class AngularElementsModule {
  constructor(public injector: Injector) {
    const el = createCustomElement(AwesomeElementComponent, { injector }); //(2)
    customElements.define('my-component', el); //(3)
  }

}
