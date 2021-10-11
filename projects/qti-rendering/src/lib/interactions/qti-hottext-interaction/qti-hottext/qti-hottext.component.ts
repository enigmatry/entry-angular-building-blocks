import { Component, ElementRef, Input, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { toBoolean } from '../../../models/utils';
import { QtiElement } from '../../../qti-element';

@Component({
  templateUrl: './qti-hottext.component.html',
  styleUrls: ['./qti-hottext.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class QtiHottextComponent extends QtiElement implements OnInit, OnDestroy {

  @Input() identifier: string;

  checked = false;
  isCorrect: boolean = null;
  correctnessClasses: string;
  disabled = false;

  constructor(elementRef: ElementRef<Element>) {
    super(elementRef);
    this.checked = toBoolean(elementRef.nativeElement.getAttribute('data-selected'));  // pre-selected
    if (elementRef.nativeElement.getAttribute('data-correct'))
    {
      this.disabled = true;
      this.isCorrect = toBoolean(elementRef.nativeElement.getAttribute('data-correct'));
      if (this.checked)
        {this.correctnessClasses = (this.isCorrect) ? 'correct' : 'incorrect';}
    }
  }


  ngOnInit(): void {
    super.ngOnInit();
  }

  onClick() {
    this.checked = !this.checked;
  }

  showAnswers(): void {
    if (this.isCorrect && !this.checked)
        {this.correctnessClasses = 'correct-answer';}
  }
}
