import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { EntryButtonDirective } from '@enigmatry/entry-components/button';

@Component({
    selector: 'app-button-example',
    templateUrl: './button-example.component.html',
    styleUrl: './button-example.component.scss',
    imports: [MatButton, EntryButtonDirective]
})
export class ButtonExampleComponent {
}
