import { Component } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-reactive-form-example',
  templateUrl: './reactive-form-example.component.html',
  styleUrls: ['./reactive-form-example.component.scss']
})
export class ReactiveFormExampleComponent {

  form = this.fb.group({
    name: ['', Validators.required],
    type: [''],
    description: [''],
    deliveryDate: [null],
    freeShipping: [false]
  });

  types = [
    { value: 0, label: `Food` },
    { value: 1, label: `Drink` },
    { value: 2, label: `Book` },
    { value: 3, label: `Car` }
  ];

  constructor(private fb: FormBuilder) { }
}
