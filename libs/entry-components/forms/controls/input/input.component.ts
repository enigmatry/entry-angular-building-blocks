import { Component, Input, inject } from '@angular/core';
import { NoopControlValueAccessor } from '../../directives/noop-control-value-accessor';
import { NgControlAccessorDirective } from '../../directives/ng-control-accessor.directive';

@Component({
  selector: 'entry-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  hostDirectives: [NoopControlValueAccessor, NgControlAccessorDirective]
})
export class EntryInputComponent {

  /**
   * The HTML5 input types
   * https://developer.mozilla.org/en-US/docs/Learn/Forms/HTML5_input_types
   * https://mdn.github.io/learning-area/html/forms/basic-input-examples
   */
  @Input() type: 'text' | 'password' | 'email' | 'tel' = 'text';

  @Input() name: string;
  @Input() label: string;
  @Input() placeholder: string;
  @Input() hint: string;
  @Input() required: boolean;
  @Input() minLength?: number;
  @Input() maxLength?: number;

  ngControlAccessor = inject(NgControlAccessorDirective);
}
