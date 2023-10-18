import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'entry-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss']
})
export class EntryTextareaComponent {

  @Input() label: string;

  @Input() placeholder: string;

  @Input() hint: string;

  @Input() name: string;

  @Input() required = false;

  @Input() minLength?: number;

  @Input() maxLength?: number;

  @Input() rows = 4;

  control: FormControl<any>;
}
