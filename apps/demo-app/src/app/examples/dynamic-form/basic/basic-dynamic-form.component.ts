import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-basic-dynamic-form',
  templateUrl: './basic-dynamic-form.component.html',
  styleUrls: ['./basic-dynamic-form.component.scss']
})
export class BasicDynamicFormComponent {
  name = 'test';
  formControl = new FormControl<string>('');
}
