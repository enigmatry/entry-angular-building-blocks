import { Component, Input, inject } from '@angular/core';
import { NoopCvaDirective } from '../../directives/noop-cva.directive';
import { NgControlAccessorDirective } from '../../directives/ng-control-accessor.directive';

@Component({
  selector: 'entry-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  hostDirectives: [NoopCvaDirective, NgControlAccessorDirective]
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
