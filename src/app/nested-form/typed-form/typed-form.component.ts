import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

//https://netbasal.com/typed-reactive-forms-in-angular-no-longer-a-type-dream-bf6982b0af28

@Component({
  selector: 'app-typed-form',
  templateUrl: './typed-form.component.html',
  styleUrls: ['./typed-form.component.scss']
})
export class TypedFormComponent {
  profileForm = new FormGroup({
    firstName: new FormControl('', { nonNullable: true }),
    lastName: new FormControl('', { nonNullable: true }),
    address: new FormGroup({
      street: new FormControl('', { nonNullable: true }),
      city: new FormControl('', { nonNullable: true })
    })
  });

  ngInInit(){
   
  }
}
