/* eslint-disable @typescript-eslint/ban-types */
import { Injectable } from '@angular/core';
import { EntryEventManagerPlugin } from './abstract.plugin';
import { throttle } from 'lodash-es';

/**
 * Provides event plugin for throttling events.
 *
 * How to use:
 * <button (click.throttle)="doSomething($event)">
 * <input (keyup.throttle.500)="doSomething($event)">
 */
@Injectable()
export class ThrottleEventPlugin extends EntryEventManagerPlugin {

  modifier = '.throttle';

  addEventListener(element: HTMLElement, eventName: string, originalHandler: Function): Function {
    // e.g. (keyup.throttle.500)
    const [_modifier, milliseconds = 500] = this.unwrapParams(eventName);

    // run original handler inside ngZone in which the event occurred
    const innerHandler = (event: any) => this.manager.getZone().runGuarded(() => originalHandler(event));

    // create throttled handler
    const throttledHandler = throttle(innerHandler, milliseconds);

    // register event with throttled handler
    return this.manager.addEventListener(element, this.unwrapEventName(eventName), throttledHandler);
  }
}
