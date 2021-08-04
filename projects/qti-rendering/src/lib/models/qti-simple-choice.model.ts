import { toBoolean } from './utils';
import { WebBase } from './web-base.model';

export class QtiSimpleChoice extends WebBase {

  identifier: string;
  fixed: boolean;
  innerHTML: string;

  // choice interaction
  checked = false;
  correct = null;

  // order interaction
  orderNumber = -1;
  correctOrderNumber = -1;

  constructor(element: Element) {
    super(element);

    if (this.element) {
      this.identifier = element.getAttribute('identifier');  // required
      this.fixed = toBoolean(element.getAttribute('fixed'));  // optional

      this.checked = toBoolean(element.getAttribute('data-selected'));  // pre-selected
      if (element.hasAttribute('data-order')) {
        this.orderNumber = Number(element.getAttribute('data-order'));  // pre-ordered
      }
      if (element.hasAttribute('data-correct')){
        if(!isNaN(Number(element.getAttribute('data-correct')))) {
          this.correctOrderNumber = Number(element.getAttribute('data-correct')); // correct order value
        } else{
            this.correct = toBoolean(element.getAttribute('data-correct')); // checked or not (choice interaction)
        }
      }
    }
  }
}
