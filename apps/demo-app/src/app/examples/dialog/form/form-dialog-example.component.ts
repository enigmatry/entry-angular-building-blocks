import { JsonPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatCheckbox } from '@angular/material/checkbox';
import { EntryButtonDirective } from '@enigmatry/entry-components/button';
import { EntryDialogService } from '@enigmatry/entry-components/dialog';
import { firstValueFrom } from 'rxjs';
import { FormDialogResult } from './form-dialog-result.interface';
import { FormDialogComponent } from './form-dialog.component';

@Component({
    selector: 'app-form-dialog-example',
    templateUrl: './form-dialog-example.component.html',
    imports: [MatCheckbox, FormsModule, MatButton, EntryButtonDirective, JsonPipe]
})
export class FormDialogExampleComponent {
    private readonly entryDialog: EntryDialogService = inject(EntryDialogService);

    protected readonly simulateServerErrors = signal(false);
    protected readonly result = signal<FormDialogResult | undefined>(undefined);

    protected readonly openForm = async(): Promise<void> =>
        this.result.set(await firstValueFrom(this.entryDialog.open(FormDialogComponent, { simulateServerErrors: this.simulateServerErrors() })));
}
