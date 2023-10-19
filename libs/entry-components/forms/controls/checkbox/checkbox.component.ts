import { Component, Input, inject } from '@angular/core';
import { NgControlAccessorDirective } from '../../directives/ng-control-accessor.directive';
import { NoopControlValueAccessor } from '../../directives/noop-control-value-accessor';

@Component({
  selector: 'entry-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  hostDirectives: [NoopControlValueAccessor, NgControlAccessorDirective]
})
export class EntryCheckboxComponent {

  @Input() name: string;
  @Input() label: string;
  @Input() required: boolean;

  ngControlAccessor = inject(NgControlAccessorDirective);
}
