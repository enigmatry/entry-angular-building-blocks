/* eslint-disable @angular-eslint/component-class-suffix */
import { Component, ElementRef, Input } from '@angular/core';
import { QtiElement } from '../qti-element';
import { ResultDeclaration } from '../models/response-declaration';

@Component({ template: '' })
export abstract class QtiInteractionElement extends QtiElement {

  @Input() responseIdentifier: string;
  @Input() showCorrectAnswers = false;

  constructor(elementRef: ElementRef<Element>) {
    super(elementRef);
  }

  abstract hasResult(): boolean;
  abstract getResult(): ResultDeclaration;
  abstract reset(): void;
  abstract showAnswers(): void;
}

