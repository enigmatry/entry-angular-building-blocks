import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'entry-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss']
})
export class EntryCheckboxComponent {

  @Input() label: string;

  @Input() placeholder: string;

  @Input() hint: string;

  @Input() name: string;

  @Input() required = false;

  control: FormControl<any>;
}
