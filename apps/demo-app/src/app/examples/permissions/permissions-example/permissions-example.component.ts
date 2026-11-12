import { Component } from '@angular/core';
import { EntryPermissionDirective, EntryPermissionService } from '@enigmatry/entry-components/permissions';
import { PermissionExampleService } from './permission.service';

@Component({
    selector: 'app-permissions-example',
    templateUrl: './permissions-example.component.html',
    styleUrl: './permissions-example.component.scss',
    imports: [EntryPermissionDirective],
    providers: [{ provide: EntryPermissionService, useClass: PermissionExampleService }]
})
export class PermissionsExampleComponent {
}
