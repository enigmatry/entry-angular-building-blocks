import { Injectable } from '@angular/core';
import { throttle } from 'lodash-es';
import { EntryEventManagerPlugin } from './entry-event-manager.plugin';

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

  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type -- the signature of Angular's EventManagerPlugin
  addEventListener(element: HTMLElement, eventName: string, originalHandler: Function): Function {
    const [_modifier, milliseconds = 500] = this.unwrapParams(eventName);

    const innerHandler = (event: Event) => this.manager.getZone().runGuarded(() => originalHandler(event));

    const throttledHandler = throttle(innerHandler, Number(milliseconds));

    return this.manager.addEventListener(element, this.unwrapEventName(eventName), throttledHandler);
  }
}
