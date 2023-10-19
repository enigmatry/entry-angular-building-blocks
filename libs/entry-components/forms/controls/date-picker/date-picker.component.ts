import { Component, Input, inject } from '@angular/core';
import { NgControlAccessorDirective } from '../../directives/ng-control-accessor.directive';
import { NoopControlValueAccessor } from '../../directives/noop-control-value-accessor';

@Component({
  selector: 'entry-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
  hostDirectives: [NoopControlValueAccessor, NgControlAccessorDirective]
})
export class EntryDatePickerComponent {

  @Input() label: string;
  @Input() hint: string;
  @Input() name: string;
  @Input() required: boolean;
  @Input() min?: number;
  @Input() max?: number;
  @Input() placeholder: string;

  ngControlAccessor = inject(NgControlAccessorDirective);
}
