import { Component } from '@angular/core';
import { EntryFileInputComponent } from '@enigmatry/entry-components/file-input';

@Component({
    selector: 'app-file-input-example',
    templateUrl: './file-input-basic-example.component.html',
    styleUrl: './file-input-basic-example.component.scss',
    imports: [EntryFileInputComponent]
})
export class FileInputBasicExampleComponent {
}
