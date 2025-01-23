import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
    selector: 'app-event-plugin-example',
    templateUrl: './event-plugin-example.component.html',
    standalone: false
})
export class EventPluginExampleComponent {

  @ViewChild('events', { static: true }) events: ElementRef<HTMLTextAreaElement>;

  log(eventName: string) {
    this.events.nativeElement.value += `\n${eventName}`;
  }
}
