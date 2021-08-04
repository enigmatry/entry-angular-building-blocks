/* eslint-disable @angular-eslint/component-class-suffix */
import { Component, ElementRef, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Events } from './models/constants';
import { createCustomEvent } from './models/utils';

@Component({ template: '' })
export abstract class QtiElement implements OnInit, OnDestroy {

  protected readonly element: Element;
  protected readonly descendants = new Set<QtiElement>();
  protected readonly parents = new Set<QtiElement>();

  constructor(protected elementRef: ElementRef<Element>) {
    this.element = this.elementRef.nativeElement;
  }

  public get localName(): string { return this.element.localName; }

  @HostListener(Events.QtiElementCreated, ['$event']) onChildCreated(event: CustomEvent<QtiElement>) {
    this.onChildComponentCreated(event.detail);
  }

  @HostListener(Events.QtiElementDestroyed, ['$event']) onChildDestroyed(event: CustomEvent<QtiElement>) {
    this.onChildComponentDestroyed(event.detail);
  }


  ngOnInit(): void {
    this.dispatchCreatedEvent();
  }

  ngOnDestroy(): void {
    this.dispatchDestroyedEvent();
  }

  getDescendantsOfType<T extends QtiElement>(componentClass: T | any): T[] {
    return [...this.descendants].filter(desc => desc instanceof componentClass) as T[];
  }

  getDescendantsByTagName(tagName: string): QtiElement[] {
    return [...this.descendants].filter(desc => desc.localName === tagName);
  }

  getParentOfType<T extends QtiElement>(componentClass: T | any): T {
    return [...this.parents].find(anc => anc instanceof componentClass) as T;
  }

  getParentByTagName(tagName: string): QtiElement {
    return [...this.parents].find(anc => anc.localName === tagName);
  }

  createCustomEvent<T>(name: string, detail: T, bubbles = true): CustomEvent<T> {
    return createCustomEvent(this.element.ownerDocument, name, detail, bubbles);
  }

  dispatchEvent(event: CustomEvent) {
    return this.element.dispatchEvent(event);
  }

  querySelector(selector: string): Element {
    return this.element.querySelector(selector);
  }

  querySelectorAll(selector: string): Element[] {
    return Array.from(this.element.querySelectorAll(selector));
  }


  private dispatchCreatedEvent(): void {
    this.dispatchEvent(this.createCustomEvent(Events.QtiElementCreated, this));
  }

  private dispatchDestroyedEvent(): void {
    this.dispatchEvent(this.createCustomEvent(Events.QtiElementDestroyed, this));
  }

  private onChildComponentCreated(childOrSelf: QtiElement) {
    if (childOrSelf && childOrSelf !== this) {
      this.descendants.add(childOrSelf);
      childOrSelf.parents.add(this);
    }
  }

  private onChildComponentDestroyed(childOrSelf: QtiElement) {
    if (childOrSelf !== this) {
      this.descendants.delete(childOrSelf);
      childOrSelf.parents.delete(this);
    } else {
      this.parents.forEach(parent => parent.descendants.delete(this));
    }
  }
}
