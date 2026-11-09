import { Component, ElementRef, viewChild } from '@angular/core';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';

@Component({
    selector: 'app-event-plugin-example',
    templateUrl: './event-plugin-example.component.html',
    imports: [MatButton, MatIcon, MatFormField, MatLabel, MatInput, MatIconButton]
})
export class EventPluginExampleComponent {
  readonly events = viewChild.required('events', { read: ElementRef<HTMLTextAreaElement> });

  readonly log = (eventName: string): void => {
    this.events().nativeElement.value += `\n${eventName}`;
  };
}
