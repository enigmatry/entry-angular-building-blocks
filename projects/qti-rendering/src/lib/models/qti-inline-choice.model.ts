import { toBoolean } from './utils';
import { WebBase } from './web-base.model';

export class QtiInlineChoice extends WebBase {

  identifier: string;
  fixed: boolean;
  selected: boolean;
  isCorrect: boolean = null;
  innerHTML: string;

  constructor(element: Element) {
    super(element);

    if (this.element) {
      this.identifier = element.getAttribute('identifier');  // required
      this.fixed = toBoolean(element.getAttribute('fixed'));  // optional
      this.selected = toBoolean(element.getAttribute('data-selected'));  // pre-selected

      if (element.getAttribute('data-correct')) {
        this.isCorrect = toBoolean(element.getAttribute('data-correct'));
      }
    }
  }
}
