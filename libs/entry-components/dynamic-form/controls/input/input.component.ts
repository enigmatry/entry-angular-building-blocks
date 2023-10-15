import { Component, Input, OnInit } from '@angular/core';
import { injectNgControl } from '../inject-ng-control';
import { NoopValueAccessorDirective } from '../../directives/noop-value-accessor.directive';

@Component({
  selector: 'entry-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  hostDirectives: [NoopValueAccessorDirective]
})
export class EntryInputComponent implements OnInit {

  @Input() label: string;

  @Input() placeholder: string;

  @Input() hint: string;

  @Input() type = 'text';

  @Input() name: string;

  @Input() required = false;

  @Input() minLength?: number;

  @Input() maxLength?: number;

  ngControl = injectNgControl();

  ngOnInit(): void { }
}
