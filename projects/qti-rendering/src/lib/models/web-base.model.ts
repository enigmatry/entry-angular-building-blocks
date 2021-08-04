export class WebBase {

  public innerHTML: string;

  constructor(public element: Element) {
    if (this.element) {
      this.innerHTML = element.innerHTML;
    }
  }
}
