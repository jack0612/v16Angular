import { Directive, HostBinding, HostListener } from '@angular/core';

//https://valor-software.com/articles/leveraging-angular-15-host-directives
@Directive({selector: '[myDir]'})
export class HostDirective {
  @HostBinding('attr.role') role1 = 'admin'; 
  @HostListener('click') onClick() {``
   this.role1=this.role1=='admin'?'guest':'admin';
  }
  
}