/* eslint-disable @angular-eslint/component-class-suffix */
import { Component, ElementRef, Input } from '@angular/core';
import { QtiElement } from '../qti-element';
import { ResultDeclaration } from '../models/response-declaration';
import { toBoolean } from '../models/utils';

@Component({ template: '' })
export abstract class QtiInteractionElement extends QtiElement {

  @Input() responseIdentifier: string;
  @Input() showCorrectAnswers = false;
  @Input('data-readonly') readonly: string;  // optional

  get isReadonly(): boolean {
    return toBoolean(this.readonly) || this.readonly === ''; // readonly="true" or readonly=""
  }

  constructor(elementRef: ElementRef<Element>) {
    super(elementRef);
  }

  abstract hasResult(): boolean;
  abstract getResult(): ResultDeclaration;
  abstract reset(): void;
  abstract showAnswers(): void;
}

