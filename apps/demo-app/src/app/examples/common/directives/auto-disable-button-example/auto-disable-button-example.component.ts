import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { EntryButtonDirective } from '@enigmatry/entry-components/button';
import { AutoDisableButtonDirective } from '@enigmatry/entry-components/common';

@Component({
    selector: 'app-auto-disable-button-example',
    templateUrl: './auto-disable-button-example.component.html',
    imports: [MatButton, AutoDisableButtonDirective, FormsModule, EntryButtonDirective]
})
export class AutoDisableButtonExampleComponent { }
