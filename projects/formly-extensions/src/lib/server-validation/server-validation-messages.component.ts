import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'enigmatry-server-validation-messages',
    templateUrl: './server-validation-messages.component.html',
    styleUrls: ['./server-validation-messages.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ServerValidationMessagesComponent implements OnInit {
    @Input() form: FormGroup;

    errorMessages: string[] = [];

    ngOnInit(): void {
        if (this.form && this.form.errors && this.form.errors.general) {
            this.errorMessages = this.form.errors.general;
        }
    }
}
