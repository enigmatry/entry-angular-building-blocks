import { Component, Input, inject } from '@angular/core';
import { NgControlAccessorDirective } from '../../directives/ng-control-accessor.directive';
import { NoopCvaDirective } from '../../directives/noop-cva.directive';

@Component({
  selector: 'entry-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  hostDirectives: [NoopCvaDirective, NgControlAccessorDirective]
})
export class EntryCheckboxComponent {

  @Input() name: string;
  @Input() label: string;
  @Input() required: boolean;

  ngControlAccessor = inject(NgControlAccessorDirective);
}
