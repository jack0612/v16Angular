import { Component, Directive, ViewChild } from '@angular/core';
//Defines the name that can be used in the template to assign this directive to a variable.
//In Angular, the exportAs property is used in directives to expose 
//a reference to the directive's instance within a template. It allows you to 
//create a template variable 
//that holds a reference to the directive instance, making it accessible for use in the template.
@Directive({
  selector: '[myDirective]',
  exportAs: 'myDirectiveRef'
})
export class DirectiveExportAsDirective {
  directiveProperty;
  doSomething() { 
    console.log('DirectiveExportAsComponent.doSomething()');
  }

  doSomething2() { 
    console.log('DirectiveExportAsComponent.doSomething2()');
  }
}



@Component({
  selector: 'app-export-as-directive-main',
  template: `
<div myDirective #child="myDirectiveRef">
  <button (click)="child.doSomething()">Click me</button>
  <p>{{ child.directiveProperty }}</p>
</div>

  `
})
export class MainComponent {
  @ViewChild('child')
  myDirective: DirectiveExportAsDirective;

  ngAfterViewInit() {
    console.log('this.myDirective',this.myDirective)
    if (this.myDirective) {
      this.myDirective.doSomething2();
    }
  }
}
