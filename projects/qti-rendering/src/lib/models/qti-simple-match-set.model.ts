import { WebBase } from './web-base.model';

export class QtiSimpleMatchSet extends WebBase {
  innerHTML: string;

  constructor(element: Element) {
    super(element);
  }
}
