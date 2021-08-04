import { WebBase } from './web-base.model';

export class QtiGapText extends WebBase {

  identifier: string;
  matchMax: number;
  matchValue: string;
  innerHTML: string;

  constructor(element: Element) {
    super(element);

    if (this.element) {
      this.identifier = element.getAttribute('identifier');  // required
      this.matchMax = Number(element.getAttribute('match-max')); // required
      this.matchValue = element.getAttribute('data-match');
    }
  }
}
