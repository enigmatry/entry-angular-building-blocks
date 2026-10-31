import { JsonPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { EntryDialogModule, EntryDialogService } from '@enigmatry/entry-components/dialog';
import { firstValueFrom } from 'rxjs';
import { SharedModule } from '../../../shared/shared.module';
import { FormDialogResult } from './form-dialog-result.interface';
import { FormDialogComponent } from './form-dialog.component';

@Component({
    selector: 'app-form-dialog-example',
    templateUrl: './form-dialog-example.component.html',
    imports: [SharedModule, EntryDialogModule, JsonPipe]
})
export class FormDialogExampleComponent {
    private readonly entryDialog: EntryDialogService = inject(EntryDialogService);

    protected readonly simulateServerErrors = signal(false);
    protected readonly result = signal<FormDialogResult | undefined>(undefined);

    protected readonly openForm = async(): Promise<void> =>
        this.result.set(await firstValueFrom(this.entryDialog.open(FormDialogComponent, { simulateServerErrors: this.simulateServerErrors() })));
}
