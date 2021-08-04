import { WebBase } from './web-base.model';

export class QtiSimpleAssociableChoice extends WebBase {

  identifier: string;
  matchMax: number;
  matchValue: string;
  correctValue: string;
  innerHTML: string;

  constructor(element: Element) {
    super(element);

    if (this.element) {
      this.identifier = element.getAttribute('identifier');  // required
      this.matchMax = Number(element.getAttribute('match-max')); // required
        this.matchValue = element.getAttribute('data-match');
        this.correctValue = element.getAttribute('data-correct');
    }
  }
}
