import { Component } from '@angular/core';

@Component({
  selector: 'app-template-driven-form-example',
  templateUrl: './template-driven-form-example.component.html',
  styleUrls: ['./template-driven-form-example.component.scss']
})
export class TemplateDrivenFormExampleComponent {

  types = [
    { value: 0, label: `Food` },
    { value: 1, label: `Drink` },
    { value: 2, label: `Book` },
    { value: 3, label: `Car` }
  ];
}
