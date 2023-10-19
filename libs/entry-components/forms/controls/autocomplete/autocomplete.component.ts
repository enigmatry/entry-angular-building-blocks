import { Component, Input, inject } from '@angular/core';
import { NgControlAccessorDirective } from '../../directives/ng-control-accessor.directive';
import { NoopControlValueAccessor } from '../../directives/noop-control-value-accessor';

@Component({
  selector: 'entry-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss'],
  hostDirectives: [NoopControlValueAccessor, NgControlAccessorDirective]
})
export class EntryAutocompleteComponent {

  @Input() name: string;
  @Input() label: string;
  @Input() hint: string;
  @Input() required: boolean;
  @Input() options?: { value: any; label: string }[];
  @Input() multiple?: boolean;
  @Input() placeholder: string;

  ngControlAccessor = inject(NgControlAccessorDirective);
}
