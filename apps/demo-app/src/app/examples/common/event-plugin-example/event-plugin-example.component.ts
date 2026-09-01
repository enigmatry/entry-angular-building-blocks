import { Component, ElementRef, viewChild } from '@angular/core';

@Component({
    selector: 'app-event-plugin-example',
    templateUrl: './event-plugin-example.component.html',
    standalone: false
})
export class EventPluginExampleComponent {
  readonly events = viewChild.required('events', { read: ElementRef<HTMLTextAreaElement> });

  readonly log = (eventName: string): void => {
    this.events().nativeElement.value += `\n${eventName}`;
  };
}
