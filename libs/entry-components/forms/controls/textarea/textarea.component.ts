import { Component, Input, inject } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { NgControlAccessorDirective } from '../../directives/ng-control-accessor.directive';
import { NoopCvaDirective } from '../../directives/noop-cva.directive';

@Component({
  selector: 'entry-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss'],
  hostDirectives: [NoopCvaDirective, NgControlAccessorDirective]
})
export class EntryTextareaComponent {

  @Input() label: string;
  @Input() placeholder: string;
  @Input() hint: string;
  @Input() name: string;
  @Input() required: boolean;
  @Input() minLength?: number;
  @Input() maxLength?: number;
  @Input() rows = 4;

  ngControlAccessor = inject(NgControlAccessorDirective);
}
