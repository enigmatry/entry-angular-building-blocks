import { Component, inject, signal } from '@angular/core';
import { EntryDialogService } from '@enigmatry/entry-components/dialog';
import { firstValueFrom } from 'rxjs';
import { CustomDialogResult } from './custom-dialog-result.interface';
import { CustomDialogComponent } from './custom-dialog.component';

@Component({
    selector: 'app-custom-dialog-example',
    templateUrl: './custom-dialog-example.component.html',
    standalone: false
})
export class CustomDialogExampleComponent {
    private readonly entryDialog: EntryDialogService = inject(EntryDialogService);

    protected readonly question = signal('Isn\'t this logo cute?');
    protected readonly result = signal<CustomDialogResult | undefined>(undefined);

    protected readonly openCustom = async(): Promise<void> =>
        this.result.set(await firstValueFrom(this.entryDialog.open(CustomDialogComponent, { question: this.question() }, true)));
}
